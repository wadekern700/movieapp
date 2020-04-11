import { MovieDataService } from './../services/movie-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  movies: any[];
  page = 1;
  showFavs: boolean = false;
  totalMovies;
  constructor(private movieDataService: MovieDataService, private router: Router) { }
  ngOnInit() {
    this.page = this.movieDataService.page;
    this.movieDataService.getPopularMovies(this.page);
    this.sub = this.movieDataService.movieEvent.subscribe(movies => {

      this.totalMovies = this.movieDataService.totalMovies;
      this.movies = movies;
    });
  }

  goToMovieDetails(movieId) {
    this.router.navigate(['/moveDetails', movieId]);
  }

  addToFavourites(movie) {

    this.movieDataService.addToFavourites(movie);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  pageChange(event) {
    this.page = event;
    this.movieDataService.getPopularMovies(event);
  }

}
