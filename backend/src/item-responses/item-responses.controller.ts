import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ItemResponse } from './item-response.entity';
import { ItemResponsesService } from './item-responses.service';
import { Score } from './score.entity';

@Controller('item-responses')
export class ItemResponsesController {
  constructor(private itemResponseService: ItemResponsesService) {}

  @Post('calculateScoreFromItem')
  async calculateScoreFromItem(
    @Body() itemResponse: ItemResponse,
  ): Promise<Score> {
    return this.itemResponseService.calculateScoreAndSave(itemResponse);
  }

  @Delete('softDelete/:id')
  softDelete(@Param('id') itemResponseId: number): Promise<any> {
    return this.itemResponseService.softDelete(itemResponseId);
  }

  @Get('restore/:id')
  restore(@Param('id') itemResponseId: number): Promise<any> {
    return this.itemResponseService.restore(itemResponseId);
  }

  @Get('getTotal/:researchGroupId')
  getTotal(@Param('researchGroupId') researchGroupId: number): Promise<number> {
    return this.itemResponseService.getTotal(researchGroupId);
  }

  @Get('getAvgScorePercent/:researchGroupId')
  getAvgScorePercent(
    @Param('researchGroupId') researchGroupId: number,
  ): Promise<number> {
    return this.itemResponseService.getAvgScorePercent(researchGroupId);
  }
}
