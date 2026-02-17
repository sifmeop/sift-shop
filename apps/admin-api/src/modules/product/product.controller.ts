import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common'
import { Product } from '@sift-shop/database'

import { createFilesInterceptor } from '~/common/config/upload.config'

import { CreateProductDto } from './dto/create-product.dto'
import { ProductService } from './product.service'

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productService.getProducts()
  }

  @Post()
  @UseInterceptors(createFilesInterceptor())
  async createProduct(
    @UploadedFiles() files: Express.MulterFile[],
    @Body() dto: CreateProductDto
  ): Promise<void> {
    return this.productService.createProduct(files, dto)
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id)
  }
}
