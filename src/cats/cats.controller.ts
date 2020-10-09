import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Cat } from './cats.entity';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
    constructor (private catsService: CatsService) {}

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll()
    }

    @Post()
    async create(@Body() catData: Cat): Promise<Cat> {
        const cat = await this.catsService.create(catData);
        return cat;
    }

    @Get(':name')
    async findByName(@Param() params): Promise<Cat> {
        const cat = await this.catsService.findByName(params.name);
        return cat;
    }

    @Delete(':id')
    async remove(@Param() params) {
        this.catsService.remove(params.id);
    }
}
