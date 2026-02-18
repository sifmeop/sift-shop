import { HttpException, Injectable } from '@nestjs/common'
import { prisma } from '@sift-shop/database'

import { FilterDto } from './dto/filter.dto'
import { UpdateFilterPositionDto } from './dto/update-filter-position.dto'

@Injectable()
export class FilterService {
  async getFilters(slug: string) {
    const result = await prisma.filter.findMany({
      where: {
        subcategory: {
          slug
        }
      },
      include: {
        options: true
      },
      orderBy: {
        position: 'asc'
      }
    })

    return result
  }

  async createFilter(slug: string, dto: FilterDto) {
    const subcategory = await prisma.subcategory.findFirst({
      where: {
        slug
      },
      include: {
        filters: {
          take: 1,
          orderBy: {
            position: 'desc'
          }
        }
      }
    })

    if (!subcategory) {
      throw new HttpException('Subcategory not found', 404)
    }

    const existingFilterByName = await prisma.filter.findFirst({
      where: {
        subcategoryId: subcategory.id,
        name: dto.name
      }
    })

    if (existingFilterByName) {
      throw new HttpException('Filter with this name already exists', 400)
    }

    const existingFilterByValue = await prisma.filter.findFirst({
      where: {
        subcategoryId: subcategory.id,
        slug: dto.value
      }
    })

    if (existingFilterByValue) {
      throw new HttpException('Filter with this value already exists', 400)
    }

    if (dto.options && dto.options.length > 0) {
      const labels = dto.options.map((opt) => opt.label)
      const uniqueLabels = new Set(labels)

      if (labels.length !== uniqueLabels.size) {
        throw new HttpException('Option labels must be unique', 400)
      }

      const values = dto.options.map((opt) => opt.value)
      const uniqueValues = new Set(values)

      if (values.length !== uniqueValues.size) {
        throw new HttpException('Option values must be unique', 400)
      }
    }

    const lastFilterPosition = subcategory.filters[0]?.position

    const position = lastFilterPosition ? lastFilterPosition + 1 : 1

    return await prisma.filter.create({
      data: {
        name: dto.name,
        slug: dto.value,
        position,
        options: {
          createMany: {
            data: dto.options
          }
        },
        subcategoryId: subcategory.id
      },
      include: {
        options: true
      }
    })
  }

  async updateFilter(id: string, dto: FilterDto) {
    const filter = await prisma.filter.findFirst({
      where: {
        id
      }
    })

    if (!filter) {
      throw new HttpException('Filter not found', 404)
    }

    const existingFilterByName = await prisma.filter.findFirst({
      where: {
        subcategoryId: filter.subcategoryId,
        name: dto.name,
        id: {
          not: id
        }
      }
    })

    if (existingFilterByName) {
      throw new HttpException('Filter with this name already exists', 400)
    }

    const existingFilterByValue = await prisma.filter.findFirst({
      where: {
        subcategoryId: filter.subcategoryId,
        slug: dto.value,
        id: {
          not: id
        }
      }
    })

    if (existingFilterByValue) {
      throw new HttpException('Filter with this value already exists', 400)
    }

    if (dto.options && dto.options.length > 0) {
      const labels = dto.options.map((opt) => opt.label)
      const uniqueLabels = new Set(labels)

      if (labels.length !== uniqueLabels.size) {
        throw new HttpException('Option labels must be unique', 400)
      }

      const values = dto.options.map((opt) => opt.value)
      const uniqueValues = new Set(values)

      if (values.length !== uniqueValues.size) {
        throw new HttpException('Option values must be unique', 400)
      }
    }

    return await prisma.filter.update({
      where: {
        id: filter.id
      },
      data: {
        name: dto.name,
        slug: dto.value,
        position: dto.position,
        options: {
          deleteMany: {},
          createMany: {
            data: dto.options
          }
        }
      },
      include: {
        options: true
      }
    })
  }

  async updatePosition(slug: string, dto: UpdateFilterPositionDto) {
    const filters = await prisma.filter.findMany({
      where: {
        subcategory: { slug },
        position: { in: [dto.old, dto.new] }
      },
      select: { id: true, position: true }
    })

    const [firstFilter, secondFilter] = filters.sort((a) =>
      a.position === dto.old ? -1 : 1
    )

    const promise = [
      prisma.filter.update({
        where: { id: firstFilter.id },
        data: { position: dto.new }
      })
    ]

    if (secondFilter) {
      promise.push(
        prisma.filter.update({
          where: { id: secondFilter.id },
          data: { position: dto.old }
        })
      )
    }

    await prisma.$transaction(promise)

    return prisma.filter.findMany({
      where: { subcategory: { slug } },
      include: { options: true },
      orderBy: { position: 'asc' }
    })
  }

  async updateFilterStatus(id: string) {
    const filter = await prisma.filter.findUnique({
      where: {
        id
      }
    })

    if (!filter) {
      throw new HttpException('Filter not found', 404)
    }

    return await prisma.filter.update({
      where: {
        id
      },
      data: {
        isActive: !filter.isActive
      }
    })
  }

  async deleteFilter(id: string) {
    const deletedFilter = await prisma.filter.delete({
      where: { id },
      select: { subcategoryId: true, position: true }
    })

    return await prisma.filter.updateManyAndReturn({
      where: {
        subcategoryId: deletedFilter.subcategoryId,
        position: { gt: deletedFilter.position }
      },
      data: {
        position: { decrement: 1 }
      }
    })
  }
}
