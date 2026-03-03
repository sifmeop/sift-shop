import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common'
import { Product } from '@sift-shop/database'

import { createFilesInterceptor } from '~/common/config/upload.config'

import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
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

  @Put(':id')
  @UseInterceptors(createFilesInterceptor())
  async updateProduct(
    @Param('id') id: string,
    @UploadedFiles() files: Express.MulterFile[],
    @Body() dto: UpdateProductDto
  ): Promise<Product> {
    return this.productService.updateProduct(id, files, dto)
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id)
  }
}
