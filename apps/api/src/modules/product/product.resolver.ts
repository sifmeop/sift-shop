import { Args, Query, Resolver } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-scalars'

import { Public } from '~/common/decorators/public.decorator'

import { ProductDetailEntity } from './entities/product-detail.entity'
import { ProductResponseEntity } from './entities/product-response.entity'
import { ProductEntity } from './entities/product.entity'
import { GetProductsInput } from './inputs/get-products.input'
import { ProductService } from './product.service'

@Resolver(() => ProductEntity)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Query(() => ProductResponseEntity, { name: 'products' })
  async getProducts(
    @Args('input', { type: () => GetProductsInput }) input: GetProductsInput,
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters?: Record<string, string>
  ): Promise<ProductResponseEntity> {
    return this.productService.findAll(input, filters)
  }

  @Public()
  @Query(() => ProductDetailEntity, { name: 'product', nullable: true })
  async getProductDetail(
    @Args('slug', { type: () => String }) slug: string
  ): Promise<ProductDetailEntity | null> {
    return this.productService.getProductDetail(slug)
  }
}
