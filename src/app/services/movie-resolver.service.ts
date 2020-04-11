import { MovieDataService } from './movie-data.service';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class MovieResolverService implements Resolve<any>{
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return this.movieDataService.getMovieDetails(route.params['id']);
  }
  constructor(private movieDataService: MovieDataService) { }
}
