import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cats.entity';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
    constructor(
        @InjectRepository(Cat)
        private catRepository: Repository<Cat>,
      ) {}

    create(cat: CreateCatDto) {
        return this.catRepository.save(cat);
    }

    findAll(): Promise<Cat[]> {
        return this.catRepository.find();
    }

    findByName(name: string): Promise<Cat> {
        return this.catRepository.findOne({ where: { name: name } });
    }

    async remove(id: string): Promise<boolean> {
        const result = await this.catRepository.delete(id);
        if(result) {
            return true;
        }

        return false;
    }
}
