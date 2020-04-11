import { MovieDataService } from './../services/movie-data.service';
import { Pipe, PipeTransform } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Pipe({
  name: 'favouritesFilter'
})
export class FavouritesFilterPipe implements PipeTransform {

  constructor(private movieDataService: MovieDataService) { }
  transform(value: any[], doFilter: boolean, searchValue): any {
    if (!doFilter) {
      return value;
    }

    return this.movieDataService.favourites;
  }

}
