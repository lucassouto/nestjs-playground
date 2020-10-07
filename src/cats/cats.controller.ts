import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto  } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
    constructor (private catsService: CatsService) {}

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll()
    }

    @Post()
    async create(@Body() createCatDto: CreateCatDto): Promise<string> {
        const cat = this.catsService.create(createCatDto);
        return `Gatinho ${cat.name} criado com sucesso!`;
    }

    @Get(':name')
    async findByName(@Param() params): Promise<string> {
        const cats = this.catsService.findByName(params.name).map(elem => elem.id);
        return `Esses são os IDs dos gatinhos com nome ${params.name}: ${cats}`;
    }
}
