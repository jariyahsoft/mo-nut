import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { Checklist, ChecklistOccurrence, DoctorQuestion, initMetadata, updateMetadata } from '@mo-nut/domain';

@Injectable()
export class ChecklistService {
  private checklists: Map<string, Checklist> = new Map();
  private occurrences: Map<string, ChecklistOccurrence> = new Map();
  private questions: Map<string, DoctorQuestion> = new Map();

  /**
   * Create checklist (Draft until patient confirms)
   */
  async createChecklist(checklist: Checklist): Promise<Checklist> {
    this.checklists.set(checklist.id, checklist);
    return checklist;
  }

  async findChecklistById(id: string): Promise<Checklist | null> {
    const c = this.checklists.get(id);
    if (!c || c.deletedAt) return null;
    return c;
  }

  async listPatientChecklists(patientId: string): Promise<Checklist[]> {
    return Array.from(this.checklists.values())
      .filter(c => c.patientId === patientId && !c.deletedAt);
  }

  /**
   * Activate a draft checklist (AI-generated suggestions must be confirmed first)
   */
  async activateChecklist(id: string, actorId: string): Promise<Checklist> {
    const c = this.checklists.get(id);
    if (!c || c.deletedAt) {
      throw new NotFoundException(`Checklist ${id} not found`);
    }
    if (c.status === 'active') {
      return c;
    }

    const updated = {
      ...c,
      ...updateMetadata(c, actorId),
      status: 'active' as const,
    };
    this.checklists.set(id, updated);
    return updated;
  }

  /**
   * Mark an item complete (or skip with reason)
   */
  async markItemComplete(
    checklistId: string,
    itemId: string,
    actorId: string,
    completed: boolean,
    skipReason?: string
  ): Promise<Checklist> {
    const c = this.checklists.get(checklistId);
    if (!c || c.deletedAt) {
      throw new NotFoundException(`Checklist ${checklistId} not found`);
    }

    if (!completed && !skipReason) {
      throw new BadRequestException('Skip reason required when skipping an item');
    }

    const updatedItems = c.items.map(item =>
      item.id === itemId
        ? {
            id: item.id,
            description: item.description,
            isCompleted: completed,
            ...(completed ? { completedAt: new Date().toISOString(), completedBy: actorId } : {}),
          }
        : item
    );

    const updated: Checklist = {
      ...c,
      ...updateMetadata(c, actorId),
      items: updatedItems,
    };

    // Auto-complete if all items done
    const allDone = updatedItems.every(i => i.isCompleted);
    if (allDone && updated.status === 'active') {
      updated.status = 'completed' as any;
    }

    this.checklists.set(checklistId, updated);
    return updated;
  }

  /**
   * Compute streak (consecutive completed occurrences)
   */
  computeStreak(occurrences: ChecklistOccurrence[]): number {
    let streak = 0;
    const sorted = [...occurrences].sort((a, b) => b.dueAt.localeCompare(a.dueAt));
    for (const occ of sorted) {
      if (occ.status === 'completed') {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }

  /**
   * Compute weekly progress (count completed occurrences in last 7 days)
   */
  computeWeeklyProgress(occurrences: ChecklistOccurrence[]): {
    completed: number;
    total: number;
    percentage: number;
  } {
    const weekAgo = new Date(Date.now() - 7 * 24 * 3600000).toISOString();
    const recent = occurrences.filter(o => o.dueAt >= weekAgo);
    const completed = recent.filter(o => o.status === 'completed').length;
    return {
      completed,
      total: recent.length,
      percentage: recent.length > 0 ? Math.round((completed / recent.length) * 100) : 0,
    };
  }

  /**
   * Create question with priority
   */
  async createQuestion(question: DoctorQuestion): Promise<DoctorQuestion> {
    this.questions.set(question.id, question);
    return question;
  }

  async listPatientQuestions(patientId: string): Promise<DoctorQuestion[]> {
    return Array.from(this.questions.values())
      .filter(q => q.patientId === patientId);
  }

  async findQuestionById(id: string): Promise<DoctorQuestion | null> {
    return this.questions.get(id) || null;
  }

  /**
   * Answer question (with audio/text)
   */
  async answerQuestion(id: string, actorId: string, answer: string, audioAssetId?: string): Promise<DoctorQuestion> {
    const q = this.questions.get(id);
    if (!q) throw new NotFoundException(`Question ${id} not found`);

    if (!answer) {
      throw new BadRequestException('Answer text required');
    }

    const updated: DoctorQuestion = {
      ...q,
      ...updateMetadata(q, actorId),
      status: 'answered' as const,
      answer,
      answeredBy: actorId,
      answeredAt: new Date().toISOString(),
    };

    this.questions.set(id, updated);
    return updated;
  }

  async listQuestionsByPriority(patientId: string): Promise<DoctorQuestion[]> {
    const questions = await this.listPatientQuestions(patientId);
    const order = { urgent: 4, high: 3, normal: 2, low: 1 };
    return questions.sort((a, b) => order[b.priority] - order[a.priority]);
  }

  /**
   * Reorder questions (for visit context)
   */
  async reorderQuestions(patientId: string, orderedIds: string[]): Promise<DoctorQuestion[]> {
    const all = await this.listPatientQuestions(patientId);
    const reordered: DoctorQuestion[] = [];
    for (const id of orderedIds) {
      const q = all.find(q => q.id === id);
      if (q) reordered.push(q);
    }
    return reordered;
  }

  /**
   * Create checklist occurrence (recurring)
   */
  async createOccurrence(occ: ChecklistOccurrence): Promise<ChecklistOccurrence> {
    this.occurrences.set(occ.id, occ);
    return occ;
  }

  async listPatientOccurrences(patientId: string): Promise<ChecklistOccurrence[]> {
    return Array.from(this.occurrences.values()).filter(o => o.patientId === patientId);
  }
}