import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';

type PinProductDto = {
  position: number;
};

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('seed')
  generateMock() {
    return this.productsService.generateMock();
  }

  @Delete('seed')
  deleteAll() {
    return this.productsService.deleteAll();
  }

  @Get()
  findAll(@Query('sort') sort?: string) {
    return this.productsService.findAll(sort);
  }

  @Put('pin/:productId')
  async pinProduct(
    @Param('productId') productId: string,
    @Body() pinProductDto: PinProductDto,
  ) {
    return this.productsService.pinProduct(+productId, pinProductDto);
  }

  @Put('unpin/:productId')
  async unpinProduct(@Param('productId') productId: string) {
    return this.productsService.unpinProduct(+productId);
  }
}
