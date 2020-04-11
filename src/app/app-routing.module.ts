import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieDataService } from './services/movie-data.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from 'src/app/movie-list/movie-list.component';
import { MovieResolverService } from 'src/app/services/movie-resolver.service';

const routes: Routes = [
  { path: '', component: MovieListComponent },
  {
    path: 'moveDetails/:id', component: MovieDetailsComponent, resolve: { movie: MovieResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
