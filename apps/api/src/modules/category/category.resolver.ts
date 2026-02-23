import { Query, Resolver } from '@nestjs/graphql'

import { Public } from '~/common/decorators/public.decorator'

import { CategoryService } from './category.service'
import { CategoryEntity } from './entities/category.entity'

@Resolver(() => CategoryEntity)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @Query(() => [CategoryEntity])
  async categories(): Promise<CategoryEntity[]> {
    return await this.categoryService.categories()
  }
}
