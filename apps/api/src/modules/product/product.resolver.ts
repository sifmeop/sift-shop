import { Args, Query, Resolver } from '@nestjs/graphql'

import { ProductResponseEntity } from './entities/product-response.entity'
import { ProductEntity } from './entities/product.entities'
import { GetProductsInput } from './inputs/get-products.input'
import { ProductService } from './product.service'

@Resolver(() => ProductEntity)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => ProductResponseEntity, { name: 'products' })
  async getProducts(
    @Args('input', { type: () => GetProductsInput }) input: GetProductsInput
  ): Promise<ProductResponseEntity> {
    return this.productService.findAll(input)
  }

  @Query(() => ProductEntity, { name: 'product' })
  async getProduct() {
    return this.productService.findOne()
  }
}
