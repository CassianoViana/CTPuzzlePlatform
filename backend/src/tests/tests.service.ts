import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageRequest } from 'src/pagination/pagerequest.dto';
import { PageResponse } from 'src/pagination/pageresponse.dto';
import { DeleteResult, Repository } from 'typeorm';
import { TestItem } from './test-item.entity';
import { Test } from './test.entity';

@Injectable()
export class TestService {

    constructor(
        @InjectRepository(Test) private testRepository: Repository<Test>,
    ) { }

    save(test: Test): Promise<Test> {
        return this.testRepository.save(test);
    }

    async getById(id: number): Promise<Test> {
        let test = await this.testRepository.findOne({ id }, { relations: ['items', 'items.item'] })
        if (test) {
            if (!test.items) {
                test.items = []
            }
            test.sortItemsByOrder()
        }
        return test;
    }

    findAll(): Promise<Test[]> {
        return this.testRepository.createQueryBuilder('test').getMany();
    }

    removeById(id: number): Promise<DeleteResult> {
        return this.testRepository.delete({ id })
    }

    async paginate(pageRequest: PageRequest): Promise<PageResponse<Test>> {
        const data = await this.testRepository.createQueryBuilder('test')
            .skip(pageRequest.start)
            .take(pageRequest.limit)
            .leftJoinAndSelect('test.items', 'item')
            .leftJoinAndSelect('test.applications', 'application')
            .getMany()
        return new PageResponse(data);
    }

    async getPuzzleBaseUrl(id: number): Promise<string> {
        let baseUrl = ''
        let test = await this.testRepository.createQueryBuilder("test")
            .leftJoinAndSelect("test.items", 'testItem')
            .leftJoinAndSelect("testItem.item", 'item')
            .leftJoinAndSelect("item.mechanic", 'mechanic')
            .where({ id })
            .getOne()
        if (test.items.length) {
            baseUrl = test.items[0].item.mechanic.baseUrl
        }
        return baseUrl;
    }
}