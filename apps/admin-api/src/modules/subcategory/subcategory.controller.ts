import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common'

import { createFilesInterceptor } from '~/common/config/upload.config'

import { CreateSubcategoryDto } from './dto/create-subcategory.dto'
import { SubcategoryService } from './subcategory.service'

@Controller('subcategories')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Get(':slug')
  async getSubcategoriesByCategory(@Param('slug') slug: string) {
    return await this.subcategoryService.getSubcategories(slug)
  }

  @Post(':id')
  @UseInterceptors(createFilesInterceptor())
  async createCategory(
    @Param('id') id: string,
    @UploadedFiles() files: Express.MulterFile[],
    @Body() dto: CreateSubcategoryDto
  ) {
    return await this.subcategoryService.createSubcategory(id, files[0], dto)
  }

  @Put(':id')
  @UseInterceptors(createFilesInterceptor())
  async updateCategory(
    @Param('id') id: string,
    @Body() dto: CreateSubcategoryDto,
    @UploadedFiles() files?: Express.MulterFile[]
  ) {
    return await this.subcategoryService.updateSubcategory(id, dto, files?.[0])
  }

  @Patch(':id')
  async updateSubcategoryStatus(@Param('id') id: string) {
    return await this.subcategoryService.updateSubcategoryStatus(id)
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return await this.subcategoryService.deleteSubcategory(id)
  }
}
