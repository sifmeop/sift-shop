import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'

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

  @Post('create')
  async createCategory(@Body() dto: CreateCategoryDto) {
    return await this.categoryService.createCategory(dto)
  }

  @Put(':id/update')
  async updateCategory(
    @Param('id') id: string,
    @Body() dto: CreateCategoryDto
  ) {
    return await this.categoryService.updateCategory(id, dto)
  }

  @Delete(':id/delete')
  async deleteCategory(@Param('id') id: string) {
    return await this.categoryService.deleteCategory(id)
  }
}
