import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as fs from 'fs';
import * as path from 'path';

type PinProductDto = {
  position: number;
};

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

    return 'Seed successfully completed';
  }

  async deleteAll() {
    await this.databaseService.product.deleteMany({});
    return 'All products deleted';
  }

  async findAll(sort?: 'price' | 'name' | 'id') {
    const products = await this.databaseService.product.findMany({
      orderBy: {
        [sort || 'id']: 'asc',
      },
    });

    if (!products.length) {
      throw new NotFoundException('No products found');
    }

    const pinnedProducts = [...products]
      .filter((product) => product.isPinned)
      .sort((a, b) => a.pinPosition - b.pinPosition);

    const unpinnedProducts = [...products].filter(
      (product) => !product.isPinned,
    );

    pinnedProducts.forEach((pinnedProduct) => {
      unpinnedProducts.splice(pinnedProduct.pinPosition - 1, 0, pinnedProduct);
    });

    return unpinnedProducts;
  }

  async pinProduct(productId: number, pinProductDto: PinProductDto) {
    if (!pinProductDto.position || pinProductDto.position < 1) {
      throw new BadRequestException('Missing required field');
    }

    const product = await this.databaseService.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (pinProductDto.position < 1) {
      throw new BadRequestException();
    }

    const positionCheck = await this.databaseService.product.findFirst({
      where: {
        isPinned: true,
        pinPosition: pinProductDto.position,
      },
    });

    if (positionCheck) {
      throw new ConflictException('Position already taken');
    }

    const record = this.databaseService.product.update({
      where: {
        id: productId,
      },
      data: {
        isPinned: true,
        pinPosition: pinProductDto.position,
      },
    });

    return record;
  }

  async unpinProduct(productId: number) {
    const record = await this.databaseService.product.findFirst({
      where: {
        id: productId,
        isPinned: true,
      },
    });

    if (!record) {
      throw new NotFoundException('Product not pinned');
    }

    const unpinnedRecord = await this.databaseService.product.update({
      where: {
        id: productId,
      },
      data: {
        isPinned: false,
        pinPosition: null,
      },
    });

    return unpinnedRecord;
  }
}
