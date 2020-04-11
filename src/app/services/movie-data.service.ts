import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {

  movies: any[] = [];
  totalMovies: number;
  movieEvent = new Subject<any[]>();
  page = 1;
  favouritesEvent = new Subject<any[]>();
  favourites: any[] = [];

  buildGetPopularMoviesUrl(pageNummber: number) {
    return `${environment.moviesBaseUrl}popular/?api_key=5b516960d27b329fe5306301c6ede0a9&page=${pageNummber}`;
  }

  buildGetMovieDetailsUrl(movieId: number) {
    return `${environment.moviesBaseUrl}${movieId}?api_key=5b516960d27b329fe5306301c6ede0a9`;
  }

  buildGetMovieCreditsUrl(movieId: number) {
    return `${environment.moviesBaseUrl}${movieId}?api_key=5b516960d27b329fe5306301c6ede0a9&append_to_response=credits`;
  }
  constructor(private http: HttpClient) { }

  getPopularMovies(page: number) {
    this.page = page;
    console.log(page)
    this.http.get<any>(this.buildGetPopularMoviesUrl(page)).pipe(
      map((results => {
        this.movies = results.results;
        this.totalMovies = results.total_results;
      })),
      catchError((err => {
        return throwError(new Error(err));
      }))).subscribe(() => {
        this.movies.forEach(movie => {
          this.getMovieCreds(movie.id);
        })
        this.movieEvent.next(this.movies.slice());
      });
  }

  getMovieCreds(movieId: number) {
    this.http.get<any>(this.buildGetMovieCreditsUrl(movieId)).pipe(
      map((movieCredits => {
        console.log(movieCredits);
        const director = movieCredits.credits.crew.find(mc => mc.job.toLowerCase() === 'director');
        const actors = movieCredits.credits.cast.splice(0, 3);
        const countryOfProduction = movieCredits.production_countries[0].name;
        const index = this.movies.findIndex(m => m.id === movieId);
        this.movies[index].director = director.name;
        this.movies[index].actors = actors;
        this.movies[index].countryOfProduction = countryOfProduction;
      })),
      catchError((err => {
        return throwError(new Error(err));
      }))).subscribe();
  }

  getMovieDetails(movieId: number) {
    return this.http.get<any>(this.buildGetMovieDetailsUrl(movieId));
  }

  addToFavourites(movie) {
    if (this.favourites.indexOf(movie) == -1) {
      this.favourites.push(movie);
    }
    // this.favouritesEvent.next(this.favourites.slice());
  }
}
