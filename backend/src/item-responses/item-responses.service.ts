import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/items/item.entity';
import { ItemsService } from 'src/items/items.service';
import { Mechanic } from 'src/mechanics/mechanic.entity';
import { ScoreFunctionTestService } from 'src/score-function-test/score-function-test.service';
import { TestItem } from 'src/tests/test-item.entity';
import { Repository } from 'typeorm';
import { ItemResponse } from './item-response.entity';
import { Score } from './score.entity';

@Injectable()
export class ItemResponsesService {
  constructor(
    @InjectRepository(ItemResponse)
    private itemResponseRepository: Repository<ItemResponse>,
    private scoreFnService: ScoreFunctionTestService,
    private itemsService: ItemsService,
  ) {}

  async countByItem(item: TestItem): Promise<number> {
    const count = await this.itemResponseRepository
      .createQueryBuilder(`itemResponse`)
      .where({ testItem: item })
      .getCount();
    return count;
  }

  async getTotal(researchGroupId: number): Promise<number> {
    const count = await this.itemResponseRepository
      .createQueryBuilder('item-response')
      .leftJoin('item-response.participation', 'participation')
      .leftJoin('participation.application', 'application')
      .leftJoin('application.test', 'test')
      .leftJoin('test.researchGroup', 'researchGroup')
      .where('researchGroup.id = :id', { id: researchGroupId })
      .andWhere('participation."deletedAt" is null')
      .getCount();
    return count;
  }

  async getAvgScorePercent(researchGroupId: number): Promise<number> {
    const itemResponses = await this.itemResponseRepository
      .createQueryBuilder('item-response')
      .leftJoin('item-response.participation', 'participation')
      .leftJoin('participation.application', 'application')
      .leftJoin('application.test', 'test')
      .leftJoinAndSelect('item-response.score', 'score')
      .leftJoinAndSelect('test.researchGroup', 'researchGroup')
      .where('researchGroup.id = :id', { id: researchGroupId })
      .andWhere('participation."deletedAt" is null')
      .getMany();
    const totalScore = itemResponses
      .map((itemResponse) => parseFloat(itemResponse.score.score + ''))
      .reduce((left, right) => left + right);
    const totalMax = itemResponses
      .map((itemResponse) => parseFloat(itemResponse.score.max + ''))
      .reduce((left, right) => left + right);
    return Math.ceil((totalScore / totalMax) * 100);
  }

  async calculateScoreAndSave(itemResponse: ItemResponse): Promise<Score> {
    itemResponse.score = await this.calculateScore(itemResponse);
    this.itemResponseRepository.save(itemResponse);
    return itemResponse.score;
  }

  softDelete(itemResponseId: number): Promise<any> {
    return this.itemResponseRepository.softDelete({ id: itemResponseId });
  }

  restore(itemResponseId: number): Promise<any> {
    return this.itemResponseRepository.restore({ id: itemResponseId });
  }

  async calculateScore(itemResponse: ItemResponse): Promise<Score> {
    let score: Score = new Score();
    try {
      const item = await this.itemsService.getById(
        itemResponse.testItem.item.id,
      );
      const mechanic = item.mechanic;
      const fnInstantiateResponse = this.getFunctionToInstantiateJsonResponse(
        mechanic,
        itemResponse,
      );
      if (fnInstantiateResponse) {
        const scoreFunctionResult = await this.scoreFnService.calculateScore({
          mechanic,
          item: `${item.itemDefinition}()`,
          response: `${fnInstantiateResponse}()`,
        });
        score = scoreFunctionResult.toScore();
      }
    } catch (e) {
      score.max = -1;
      score.score = -1;
    }
    return score;
  }

  async calculateScores(
    itemResponses: ItemResponse[],
  ): Promise<ItemResponse[]> {
    itemResponses
      .filter((itemResponse) => !itemResponse.testItem)
      .forEach((itemResponse) => {
        console.log('Não há item de teste para a resposta ', itemResponse);
      });

    itemResponses = itemResponses.filter(
      (itemResponse) => itemResponse.testItem,
    );
    await this.loadItemsResponsesWithMechanics(itemResponses);

    const calculationScoreParamsList = itemResponses.map((itemResponse) => {
      const item = itemResponse.testItem.item;
      return {
        mechanic: item.mechanic,
        itemResponse: itemResponse,
        response: this.getFunctionToInstantiateJsonResponse(
          item.mechanic,
          itemResponse,
        ),
      };
    });

    const itemResponsesWithCalculatedScores =
      await this.scoreFnService.calculateScores(calculationScoreParamsList);
    await this.itemResponseRepository.save(itemResponsesWithCalculatedScores);
    return itemResponsesWithCalculatedScores;
  }

  async loadItemsResponsesWithMechanics(itemResponses: ItemResponse[]) {
    const idByItemMap: Map<number, Item> = new Map<number, Item>();
    const itemsIds = itemResponses.map(
      (itemResponse) => itemResponse.testItem.item.id,
    );

    const items = await this.itemsService.getByIds(itemsIds);
    items.forEach((item) => {
      idByItemMap.set(item.id, item);
    });
    itemResponses.forEach((itemResponse) => {
      itemResponse.testItem.item = idByItemMap.get(
        itemResponse.testItem.item.id,
      );
    });
  }

  getFunctionToInstantiateJsonResponse(
    mechanic: Mechanic,
    itemResponse: ItemResponse,
  ): string {
    const responseClassName = mechanic
      .getDeclaredClassesNames()
      .filter((className) => className.startsWith('R'))[0];
    return `function(){
            return Object.assign(new ${responseClassName}(), ${itemResponse.response})
        }`;
  }
}
