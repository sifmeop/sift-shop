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

  @Post(':id/create')
  @UseInterceptors(createFilesInterceptor())
  async createCategory(
    @Param('id') id: string,
    @UploadedFile() files: Express.MulterFile[],
    @Body() dto: CreateSubcategoryDto
  ) {
    return await this.subcategoryService.createSubcategory(id, files[0], dto)
  }

  @Put(':id/update')
  @UseInterceptors(createFilesInterceptor())
  async updateCategory(
    @Param('id') id: string,
    @Body() dto: CreateSubcategoryDto,
    @UploadedFile() files?: Express.MulterFile[]
  ) {
    return await this.subcategoryService.updateSubcategory(id, dto, files?.[0])
  }

  @Delete(':id/delete')
  async deleteCategory(@Param('id') id: string) {
    return await this.subcategoryService.deleteSubcategory(id)
  }
}
