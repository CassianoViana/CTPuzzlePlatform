import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PageRequest } from 'src/pagination/pagerequest.dto';
import { PageResponse } from 'src/pagination/pageresponse.dto';
import { DeleteResult } from 'typeorm';
import { Test } from './test.entity';
import { TestService } from './tests.service';


@Controller('tests')
export class TestController {

    constructor(private testService: TestService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    save(@Body() test: Test): Promise<Test> {
        return this.testService.save(test)
    }

    @Get('byId/:id')
    getById(@Param('id') id: number): Promise<Test> {
        return this.testService.getById(id);
    }

    @Get('findAll')
    findAll(): Promise<Test[]> {
        return this.testService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post('paginate')
    async paginate(@Body() pageRequest: PageRequest): Promise<PageResponse<Test>> {
        return this.testService.paginate(pageRequest);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('remove/:id')
    remove(@Param('id') id: number): Promise<DeleteResult> {
        return this.testService.removeById(id);
    }

    @Get('getPuzzleBaseUrl/:id')
    async getPuzzleBaseUrl(@Param('id') id: number):Promise<string> {
        return this.testService.getPuzzleBaseUrl(id)
    }
}