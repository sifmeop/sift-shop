import { Controller, Get } from '@nestjs/common'
import { Product } from '@sift-shop/database'

import { ProductService } from './product.service'

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productService.getProducts()
  }
}
