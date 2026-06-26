import { Controller, Get, Post, Patch, Body, Param, Req, UseGuards, NotFoundException } from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@Controller('checklist')
@UseGuards(FirebaseAuthGuard)
export class ChecklistController {
  constructor(private checklistService: ChecklistService) {}

  /**
   * Create checklist (Draft until confirmed)
   */
  @Post()
  async createChecklist(@Req() req: any, @Body() body: any) {
    const result = await this.checklistService.createChecklist({
      ...body,
      patientId: body.patientId || req.user.uid,
      status: 'active',
      items: body.items || [],
    });
    return { data: result, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * List patient checklists
   */
  @Get('patient/:patientId')
  async list(@Param('patientId') patientId: string) {
    const checklists = await this.checklistService.listPatientChecklists(patientId);
    return { data: { checklists }, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Activate a draft checklist (confirmation step)
   */
  @Post(':id/activate')
  async activate(@Req() req: any, @Param('id') id: string) {
    const result = await this.checklistService.activateChecklist(id, req.user.uid);
    return { data: result, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Mark checklist item complete or skip
   */
  @Post(':id/items/:itemId/complete')
  async completeItem(
    @Req() req: any,
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @Body() body: { completed: boolean; skipReason?: string }
  ) {
    const result = await this.checklistService.markItemComplete(
      id,
      itemId,
      req.user.uid,
      body.completed,
      body.skipReason
    );
    return { data: result, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Get weekly progress and streak
   */
  @Get('patient/:patientId/progress')
  async getProgress(@Param('patientId') patientId: string) {
    const occurrences = await this.checklistService.listPatientOccurrences(patientId);
    const progress = this.checklistService.computeWeeklyProgress(occurrences);
    const streak = this.checklistService.computeStreak(occurrences);
    return {
      data: { ...progress, streak },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }
}

@Controller('questions')
@UseGuards(FirebaseAuthGuard)
export class QuestionController {
  constructor(private checklistService: ChecklistService) {}

  @Post()
  async create(@Req() req: any, @Body() body: any) {
    const result = await this.checklistService.createQuestion({
      ...body,
      patientId: body.patientId || req.user.uid,
      status: 'draft',
      priority: body.priority || 'normal',
    });
    return { data: result, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  @Get('patient/:patientId')
  async list(@Param('patientId') patientId: string) {
    const questions = await this.checklistService.listQuestionsByPriority(patientId);
    return { data: { questions }, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  @Post(':id/answer')
  async answer(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: { answer: string; audioAssetId?: string }
  ) {
    const result = await this.checklistService.answerQuestion(id, req.user.uid, body.answer, body.audioAssetId);
    return { data: result, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  @Post('reorder')
  async reorder(@Req() req: any, @Body() body: { patientId: string; orderedIds: string[] }) {
    const result = await this.checklistService.reorderQuestions(body.patientId, body.orderedIds);
    return { data: { questions: result }, meta: { serverTime: new Date().toISOString() }, error: null };
  }
}