import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CreateCatDto  } from './dto/create-cat.dto';

describe('CatsController', () => {
  let controller: CatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
    }).compile();

    controller = module.get<CatsController>(CatsController);
  });

  it('should return list of kittens', async () => {
    expect(await controller.findAll()).toStrictEqual(['Apollo', 'Hippolyta']);
  });

  it('should raise a kitten', async () => {
    const cat = new CreateCatDto();
    cat.name = 'Nest';
    cat.age = 1;
    cat.breed = '';

    expect(await controller.create(cat)).toBe(
      'Gatinho Nest criado com sucesso!'
    );
  });

  it('sshould return one kitten', async () => {
    expect(await controller.findOne({id: 1})).toBe(
      'Esse é o gatinho #1'
    );
  });
});
