import { Body, Controller, Get, Header, HttpCode, Param, Post } from '@nestjs/common';
import { CreateCatDto  } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
    @Get()
    @HttpCode(200) // Utilizado apenas para didática, pois GET já retorna 200 como padrão e POST 201
    @Header('Test', 'none')
    async findAll(): Promise<string[]> {
        return ['Apollo', 'Hippolyta'];
    }

    @Post()
    @HttpCode(201)
    async create(@Body() createCatDto: CreateCatDto): Promise<string> {
      return `Gatinho ${createCatDto.name} criado com sucesso!`;
    }

    @Get(':id')
    async findOne(@Param() params): Promise<string> {
      return `Esse é o gatinho #${params.id}`;
    }
}
