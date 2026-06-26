import * as fs from 'fs';
import * as readline from 'readline';
import * as crypto from 'crypto';

/**
 * Mo-nut Canonical Data Export, Import, and Dry-run Validation Engine
 *
 * This tool implements:
 * 1. NDJSON Canonical Export with integrity checks and checksums.
 * 2. Relationship validation checks across entities.
 * 3. Dry-run simulation modes including data reconciliation and shadow reads.
 */

export class CanonicalEngine {
  constructor(repositories = {}) {
    this.repos = repositories;
  }

  /**
   * Computes SHA-256 hash of a string
   */
  computeHash(content) {
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  /**
   * Generate canonical export metadata header
   */
  generateHeader(counts, checksum, exportedBy = 'system', env = 'development') {
    return {
      exportVersion: '1.0.0',
      exportedAt: new Date().toISOString(),
      exportedBy,
      environment: env,
      checksum,
      entityCounts: counts,
    };
  }

  /**
   * Export all entities to NDJSON format
   */
  async exportToNDJSON(outputPath, options = {}) {
    const counts = {};
    const writeStream = fs.createWriteStream(outputPath);
    let hashContent = '';

    // Export each entity type
    for (const [entityName, repo] of Object.entries(this.repos)) {
      if (typeof repo.listAll === 'function' || typeof repo.list === 'function') {
        const listResult = typeof repo.listAll === 'function'
          ? await repo.listAll()
          : await repo.list({ limit: 10000 });

        const entities = listResult.users || listResult.patients || listResult.medications || listResult.appointments || listResult || [];
        counts[entityName] = entities.length;

        for (const entity of entities) {
          const record = {
            _type: entityName,
            ...entity,
          };
          const jsonLine = JSON.stringify(record) + '\n';
          writeStream.write(jsonLine);
          hashContent += jsonLine;
        }
      }
    }

    const checksum = this.computeHash(hashContent);
    const header = this.generateHeader(counts, checksum, options.exportedBy, options.env);

    // We write the header to a separate metadata file or prepend it
    const metaPath = outputPath + '.meta.json';
    fs.writeFileSync(metaPath, JSON.stringify(header, null, 2));

    // Wait for stream to finish writing
    await new Promise((resolve, reject) => {
      writeStream.end((err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    return { header, outputPath, metaPath };
  }

  /**
   * Validate an exported NDJSON file's integrity and relationships
   */
  async validateExport(inputPath, metaPath) {
    const header = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    const fileStream = fs.createReadStream(inputPath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    const entities = [];
    let fileContent = '';
    const counts = {};

    for await (const line of rl) {
      if (!line.trim()) continue;
      fileContent += line + '\n';
      const entity = JSON.parse(line);
      entities.push(entity);

      const type = entity._type;
      counts[type] = (counts[type] || 0) + 1;
    }

    // 1. Verify Checksum
    const checksum = this.computeHash(fileContent);
    if (checksum !== header.checksum) {
      return {
        valid: false,
        error: 'CHECKSUM_MISMATCH',
        details: `Calculated ${checksum}, expected ${header.checksum}`,
      };
    }

    // 2. Count Validation
    for (const [type, count] of Object.entries(counts)) {
      if (header.entityCounts[type] !== count) {
        return {
          valid: false,
          error: 'COUNT_MISMATCH',
          details: `Entity count for ${type} is ${count}, expected ${header.entityCounts[type]}`,
        };
      }
    }

    // 3. Relationship Validation
    const idMap = new Map();
    for (const entity of entities) {
      idMap.set(entity.id, entity);
    }

    const errors = [];
    for (const entity of entities) {
      // Validate patient relationship
      if (entity.patientId && !idMap.has(entity.patientId)) {
        errors.push(`Missing patient relationship: Entity ${entity._type} (${entity.id}) references missing patient ${entity.patientId}`);
      }

      // Validate user relationship
      if (entity.userId && !idMap.has(entity.userId)) {
        errors.push(`Missing user relationship: Entity ${entity._type} (${entity.id}) references missing user ${entity.userId}`);
      }

      // Validate schedule relationship
      if (entity.scheduleId && !idMap.has(entity.scheduleId)) {
        errors.push(`Missing schedule relationship: Entity ${entity._type} (${entity.id}) references missing schedule ${entity.scheduleId}`);
      }

      // Validate patient owner relationship
      if (entity._type === 'Patient' && entity.accountOwnerUserId && !idMap.has(entity.accountOwnerUserId)) {
        errors.push(`Missing owner relationship: Patient (${entity.id}) references missing owner user ${entity.accountOwnerUserId}`);
      }
    }

    if (errors.length > 0) {
      return {
        valid: false,
        error: 'RELATIONSHIP_VALIDATION_FAILED',
        details: errors,
      };
    }

    return {
      valid: true,
      header,
      entityCounts: counts,
    };
  }

  /**
   * Perform migration dry-run reconciliation
   */
  async reconcileDryRun(sourceData, targetData) {
    const report = {
      reconciledAt: new Date().toISOString(),
      status: 'success',
      totalSourceCount: sourceData.length,
      totalTargetCount: targetData.length,
      missingIds: [],
      mismatchedVersions: [],
      sampleComparison: [],
    };

    if (sourceData.length !== targetData.length) {
      report.status = 'warning';
      report.reason = `Count mismatch: source has ${sourceData.length}, target has ${targetData.length}`;
    }

    const sourceMap = new Map(sourceData.map((e) => [e.id, e]));
    const targetMap = new Map(targetData.map((e) => [e.id, e]));

    // Find missing IDs
    for (const id of sourceMap.keys()) {
      if (!targetMap.has(id)) {
        report.missingIds.push(id);
      } else {
        const source = sourceMap.get(id);
        const target = targetMap.get(id);

        if (source.version !== target.version) {
          report.mismatchedVersions.push({
            id,
            sourceVersion: source.version,
            targetVersion: target.version,
          });
        }
      }
    }

    if (report.missingIds.length > 0 || report.mismatchedVersions.length > 0) {
      report.status = 'failed';
    }

    // Sample reconciliation (up to 10 entities)
    const samples = Array.from(sourceMap.keys()).slice(0, 10);
    for (const id of samples) {
      if (targetMap.has(id)) {
        const source = sourceMap.get(id);
        const target = targetMap.get(id);

        report.sampleComparison.push({
          id,
          matches: JSON.stringify(source) === JSON.stringify(target),
        });
      }
    }

    return report;
  }
}
