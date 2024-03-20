import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async generateMock() {
    const filePath = path.resolve(__dirname, '../../mockData.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const products = JSON.parse(data);

    await this.databaseService.product.createMany({
      data: products,
    });

    return 'Mock data generated';
  }

  async findAll(sort?: 'price' | 'name' | 'id') {
    return this.databaseService.product.findMany({
      orderBy: {
        [sort || 'id']: 'asc',
      },
    });
  }
}
