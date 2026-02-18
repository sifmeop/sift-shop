import { Args, Query, Resolver } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-scalars'

import { ProductResponseEntity } from './entities/product-response.entity'
import { ProductEntity } from './entities/product.entities'
import { GetProductsInput } from './inputs/get-products.input'
import { ProductService } from './product.service'

@Resolver(() => ProductEntity)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => ProductResponseEntity, { name: 'products' })
  async getProducts(
    @Args('input', { type: () => GetProductsInput }) input: GetProductsInput,
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters?: Record<string, string>
  ): Promise<ProductResponseEntity> {
    return this.productService.findAll(input, filters)
  }

  @Query(() => ProductEntity, { name: 'product' })
  async getProduct() {
    return this.productService.findOne()
  }
}
