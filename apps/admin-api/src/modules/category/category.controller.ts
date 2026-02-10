import { Controller, Get, Param } from '@nestjs/common'

import { CategoryService } from './category.service'

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories() {
    return await this.categoryService.getCategories()
  }

  @Get(':id')
  async getSubcategories(@Param('id') id: string) {
    return await this.categoryService.getSubcategories(id)
  }
}
