import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

type PinProductDto = {
  position: number;
};

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async generateMock() {
    if (await this.databaseService.product.count()) {
      throw new ConflictException('Database already seeded');
    }
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

  async findAll(
    sort?: string,
    minPrice?: string,
    maxPrice?: string,
    stock?: string,
  ) {
    try {
      const additionalParameters: any = {};

      if (minPrice && maxPrice) {
        additionalParameters['price'] = {
          gte: Number(minPrice),
          lte: Number(maxPrice),
        };
      } else if (minPrice && !maxPrice) {
        additionalParameters['price'] = {
          gte: Number(minPrice),
        };
      } else if (maxPrice && !minPrice) {
        additionalParameters['price'] = {
          lte: Number(maxPrice),
        };
      }

      if (stock) {
        additionalParameters['stock'] = {
          gt: Number(stock),
        };
      }

      const products = await this.databaseService.product.findMany({
        where: additionalParameters,
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
        unpinnedProducts.splice(
          pinnedProduct.pinPosition - 1,
          0,
          pinnedProduct,
        );
      });

      return unpinnedProducts;
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException('No products found');
      } else if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException('Invalid sort parameter');
      } else {
        throw new Error('Internal server error');
      }
    }
  }

  async pinProduct(productId: number, pinProductDto: PinProductDto) {
    console.log(typeof pinProductDto.position);
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
