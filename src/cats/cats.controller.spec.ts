import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CreateCatDto  } from './dto/create-cat.dto';

describe('CatsController', () => {
  let controller: CatsController;
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    service = module.get<CatsService>(CatsService);
  });

  it('should return list of kittens', async () => {
    const cat = new CreateCatDto();
    cat.name = 'Hippolyta';
    cat.age = 1;
    cat.breed = '';
 
    service.create(cat);

    expect(await controller.findAll()).toStrictEqual([cat]);
  });

  it('should raise a kitten', async () => {
    const cat = new CreateCatDto();
    cat.name = 'Apollo';
    cat.age = 0.5;
    cat.breed = '';

    expect(await controller.create(cat)).toBe(
      'Gatinho Apollo criado com sucesso!'
    );
  });

  it('should return one kitten', async () => {
    const catHippolyta = new CreateCatDto();
    catHippolyta.id = 1;
    catHippolyta.name = 'Hippolyta';
    catHippolyta.age = 1;
    
    const catApollo = new CreateCatDto();
    catApollo.id = 2;
    catApollo.name = 'Apollo';
    catApollo.age = 0.5;

    const catHippolyta2 = new CreateCatDto();
    catHippolyta2.id = 3;
    catHippolyta2.name = 'Hippolyta';
    catHippolyta2.age = 5;

    service.create(catHippolyta);
    service.create(catApollo);
    service.create(catHippolyta2);

    expect(await controller.findByName({name: 'Hippolyta'})).toBe(
      'Esses são os IDs dos gatinhos com nome Hippolyta: 1,3'
    );
  });
});
