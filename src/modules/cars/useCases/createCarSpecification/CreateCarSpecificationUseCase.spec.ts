import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/inMemory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Soecification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
  });

  it('should be able to add a new specification to a non-existent car', async () => {
    expect(async () => {
      const car_id = '1234';
      const specifications_ids = ['54321'];
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_ids,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name car',
      description: 'decsription car',
      daily_rate: 100,
      license_plate: 'abc123',
      fine_amount: 60,
      brand: 'Ford',
      category_id: 'category',
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'Specification test',
      description: 'test',
    });

    const specifications_ids: any = [specification.id];

    const specificationsCars =
      car &&
      (await createCarSpecificationUseCase.execute({
        car_id: car.id,
        specifications_ids,
      }));

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars?.specifications.length).toBe(1);
  });
});
