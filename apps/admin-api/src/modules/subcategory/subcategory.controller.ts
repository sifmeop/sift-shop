import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'

import { createFileInterceptor } from '~/common/config/upload.config'

import { CreateSubcategoryDto } from './dto/create-subcategory.dto'
import { SubcategoryService } from './subcategory.service'

@Controller('subcategories')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Get(':slug')
  async getSubcategoriesByCategory(@Param('slug') slug: string) {
    return await this.subcategoryService.getSubcategories(slug)
  }

  @Post(':id/create')
  @UseInterceptors(createFileInterceptor())
  async createCategory(
    @Param('id') id: string,
    @UploadedFile() file: Express.MulterFile,
    @Body() dto: CreateSubcategoryDto
  ) {
    return await this.subcategoryService.createSubcategory(id, file, dto)
  }

  @Put(':id/update')
  @UseInterceptors(createFileInterceptor())
  async updateCategory(
    @Param('id') id: string,
    @Body() dto: CreateSubcategoryDto,
    @UploadedFile() file?: Express.MulterFile
  ) {
    return await this.subcategoryService.updateSubcategory(id, dto, file)
  }

  @Delete(':id/delete')
  async deleteCategory(@Param('id') id: string) {
    return await this.subcategoryService.deleteSubcategory(id)
  }
}
