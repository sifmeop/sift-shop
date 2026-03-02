import { Args, Query, Resolver } from '@nestjs/graphql'

import { Public } from '~/common/decorators/public.decorator'

import { SearchEntity } from './entities/search.entity'
import { SearchService } from './search.service'

@Resolver(() => SearchEntity)
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Public()
  @Query(() => [SearchEntity])
  search(
    @Args('q', { type: () => String }) q: string
  ): Promise<SearchEntity[]> {
    return this.searchService.search(q)
  }
}
