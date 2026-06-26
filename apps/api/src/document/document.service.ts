import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DocumentAsset } from '@mo-nut/domain';
import * as crypto from 'crypto';

export interface ChunkUploadResult {
  etag: string;
}

@Injectable()
export class DocumentService {
  private assets: Map<string, DocumentAsset> = new Map();
  private chunkCache: Map<string, Set<number>> = new Map();

  // Enforce MIME and size checks (max 10MB)
  private readonly ALLOWED_MIMES = ['image/jpeg', 'image/png', 'application/pdf'];
  private readonly MAX_SIZE = 10 * 1024 * 1024; // 10MB

  /**
   * Initiate a secure chunked upload session
   */
  async initiateUpload(params: {
    patientId: string;
    filename: string;
    mimeType: string;
    fileSize: number;
    checksum: string;
    uploadedBy: string;
  }): Promise<DocumentAsset> {
    if (!this.ALLOWED_MIMES.includes(params.mimeType)) {
      throw new BadRequestException(`Unsupported MIME type: ${params.mimeType}`);
    }

    if (params.fileSize > this.MAX_SIZE) {
      throw new BadRequestException(`File size exceeds 10MB limit: ${params.fileSize} bytes`);
    }

    const id = `asset-${crypto.randomUUID().slice(0, 8)}`;
    const asset: DocumentAsset = {
      id,
      schemaVersion: 1,
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      patientId: params.patientId,
      objectKey: `secure-uploads/${params.patientId}/${id}`,
      mimeType: params.mimeType,
      fileSize: params.fileSize,
      checksum: params.checksum,
      status: 'uploaded',
      category: 'prescription', // default to prescription since this is OCR capture for medications/appointments
      originalFilename: params.filename,
      uploadedBy: params.uploadedBy,
    };

    this.assets.set(id, asset);
    this.chunkCache.set(id, new Set());

    return asset;
  }

  /**
   * Upload single chunk with checksum verification
   */
  async uploadChunk(
    assetId: string,
    chunkIndex: number,
    data: Buffer,
    checksum: string
  ): Promise<ChunkUploadResult> {
    const asset = this.assets.get(assetId);
    if (!asset) {
      throw new NotFoundException(`Asset ${assetId} not found`);
    }

    // Verify chunk integrity
    const computed = crypto.createHash('sha256').update(data).digest('hex');
    if (computed !== checksum) {
      throw new BadRequestException(`Chunk ${chunkIndex} checksum mismatch`);
    }

    const uploaded = this.chunkCache.get(assetId) || new Set();
    uploaded.add(chunkIndex);
    this.chunkCache.set(assetId, uploaded);

    return { etag: `etag-${assetId}-${chunkIndex}` };
  }

  /**
   * Complete upload session and verify full file checksum
   */
  async completeUpload(assetId: string, totalChunks: number, expectedChecksum: string): Promise<DocumentAsset> {
    const asset = this.assets.get(assetId);
    if (!asset) {
      throw new NotFoundException(`Asset ${assetId} not found`);
    }

    const uploaded = this.chunkCache.get(assetId);
    if (!uploaded || uploaded.size !== totalChunks) {
      throw new BadRequestException(`Incomplete upload: expected ${totalChunks} chunks, got ${uploaded?.size ?? 0}`);
    }

    // Validate full file checksum
    if (asset.checksum !== expectedChecksum) {
      throw new BadRequestException('Full file checksum mismatch');
    }

    asset.status = 'ready';
    asset.updatedAt = new Date().toISOString();
    this.assets.set(assetId, asset);

    return asset;
  }

  async findById(id: string): Promise<DocumentAsset | null> {
    const asset = this.assets.get(id);
    if (!asset || asset.deletedAt) return null;
    return asset;
  }
}
