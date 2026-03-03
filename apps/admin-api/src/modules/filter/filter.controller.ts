import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query
} from '@nestjs/common'

import { FilterDto } from './dto/filter.dto'
import { UpdateFilterPositionDto } from './dto/update-filter-position.dto'
import { FilterService } from './filter.service'

@Controller('filters')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Get()
  async getAllFilters(@Query('subcategorySlug') subcategorySlug?: string) {
    return this.filterService.getFilters(subcategorySlug)
  }

  @Get(':slug')
  async getFilters(@Param('slug') slug: string) {
    return this.filterService.getFilters(slug)
  }

  @Post(':slug')
  async createFilter(@Param('slug') slug: string, @Body() dto: FilterDto) {
    return this.filterService.createFilter(slug, dto)
  }

  @Put(':id')
  async updateFilter(@Param('id') id: string, @Body() dto: FilterDto) {
    return this.filterService.updateFilter(id, dto)
  }

  @Patch(':slug/position')
  async updatePosition(
    @Param('slug') slug: string,
    @Body() dto: UpdateFilterPositionDto
  ) {
    return this.filterService.updatePosition(slug, dto)
  }

  @Patch(':id/status')
  async updateFilterStatus(@Param('id') id: string) {
    return await this.filterService.updateFilterStatus(id)
  }

  @Delete(':id')
  async deleteFilter(@Param('id') id: string) {
    return this.filterService.deleteFilter(id)
  }
}