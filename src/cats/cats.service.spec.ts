import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cat } from './cats.entity';
import { CatsService } from './cats.service';
import { CreateCatDto  } from './dto/create-cat.dto';

describe('CatsController', () => {
  let service: CatsService;

  const mockRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getRepositoryToken(Cat),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should raise a kitten 😻', async () => {
    const cat = new CreateCatDto();
    cat.name = 'Hippolyta';
    cat.age = 1;
    cat.breed = '';

    mockRepository.save.mockReturnValue(cat);
    const catCreated = await service.create(cat);

    expect(catCreated).toMatchObject(cat);
    expect(mockRepository.save).toBeCalledTimes(1);
  });

  it('should return list of kittens 😺😺😺', async () => {
    const catHippolyta = new CreateCatDto();
    catHippolyta.id = 1;
    catHippolyta.name = 'Hippolyta';
    catHippolyta.age = 1;
    
    const catApollo = new CreateCatDto();
    catApollo.id = 2;
    catApollo.name = 'Apollo';
    catApollo.age = 0.5;

    mockRepository.find.mockReturnValue([catHippolyta, catApollo]);

    expect(await service.findAll()).toEqual([catHippolyta, catApollo]);
    expect(mockRepository.find).toBeCalledTimes(1);
  });

  it('should return only one kitten 😺', async () => {
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
    
    mockRepository.findOne.mockReturnValue(catHippolyta2);

    expect(service.findByName(catHippolyta2.name)).toMatchObject(
      catHippolyta2
    );
    expect(mockRepository.findOne).toBeCalledTimes(1);
  });

  it('should delete one kitten 😭', async () => {
    const catHippolyta = new CreateCatDto();
    catHippolyta.id = 1;
    catHippolyta.name = 'Hippolyta';
    catHippolyta.age = 1;

    mockRepository.delete.mockReturnValue(catHippolyta);
    
    const deletedCat = await service.remove('1');
    
    expect(deletedCat).toBe(true);
    expect(mockRepository.delete).toBeCalledTimes(1);
  });

});

