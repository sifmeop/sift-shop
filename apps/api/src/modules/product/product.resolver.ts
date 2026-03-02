import { Args, Query, Resolver } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-scalars'

import { Authorized } from '~/common/decorators/authorized.decorator'
import { OptionalAuth } from '~/common/decorators/optional-auth.decorator'
import { Public } from '~/common/decorators/public.decorator'

import { HomeProductsEntity } from './entities/home-products.entity'
import { ProductDetailEntity } from './entities/product-detail.entity'
import { ProductResponseEntity } from './entities/product-response.entity'
import { ProductEntity } from './entities/product.entity'
import { GetProductsInput } from './inputs/get-products.input'
import { ProductService } from './product.service'

@Resolver(() => ProductEntity)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Query(() => HomeProductsEntity, { name: 'homeProducts' })
  async getHomeProducts(): Promise<HomeProductsEntity> {
    return this.productService.getHomeProducts()
  }

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
  @OptionalAuth()
  @Query(() => ProductDetailEntity, { name: 'product', nullable: true })
  async getProductDetail(
    @Authorized('id') userId: string,
    @Args('slug', { type: () => String }) slug: string
  ): Promise<ProductDetailEntity | null> {
    return this.productService.getProductDetail(slug, userId)
  }

  @Public()
  @Query(() => [ProductEntity], { name: 'relatedProducts' })
  async getRelatedProducts(
    @Args('slug', { type: () => String }) slug: string,
    @Args('productId', { type: () => String }) productId: string
  ): Promise<ProductEntity[]> {
    return this.productService.getRelatedProducts(slug, productId)
  }
}
