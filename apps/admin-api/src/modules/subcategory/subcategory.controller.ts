import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

import { CreateSubcategoryDto } from './dto/create-subcategory.dto'
import { SubcategoryService } from './subcategory.service'

@Controller('subcategories')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Get(':id')
  async getSubcategoriesByCategory(@Param('id') id: string) {
    return await this.subcategoryService.getSubcategories(id)
  }

  @Post(':id/create')
  async createCategory(
    @Param('id') id: string,
    @Body() dto: CreateSubcategoryDto
  ) {
    return await this.subcategoryService.createSubcategory(id, dto)
  }

  @Put(':id/update')
  async updateCategory(
    @Param('id') id: string,
    @Body() dto: CreateSubcategoryDto
  ) {
    return await this.subcategoryService.updateSubcategory(id, dto)
  }

  @Delete(':id/delete')
  async deleteCategory(@Param('id') id: string) {
    return await this.subcategoryService.deleteSubcategory(id)
  }
}
