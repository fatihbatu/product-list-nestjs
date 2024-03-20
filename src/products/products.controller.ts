import { Controller, Get, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('generate')
  generateMock() {
    return this.productsService.generateMock();
  }

  @Get()
  findAll(@Query('sort') sort?: 'price' | 'name' | 'id') {
    return this.productsService.findAll(sort);
  }
}
