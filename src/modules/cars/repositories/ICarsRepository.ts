import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Cars';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car | undefined>;
  findByLicensePlate(licensePlate: string): Promise<Car | undefined>;
  findAvailable(
    category_id?: string,
    brand?: string,
    name?: string,
  ): Promise<Car[]>;
}

export { ICarsRepository };
