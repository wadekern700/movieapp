import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }
  movie: any;
  ngOnInit() {

    this.route.data.subscribe(val => {
      console.log(val);
      this.movie = val["movie"];
      console.log(this.movie)
    });

    this.route.queryParamMap.subscribe(val => {
      console.log(val);

    });
  }

  goHome() {
    this.router.navigate(['']);
  }

  generateArray() {
    return Object.keys(this.movie).map((key) => { return { key, value: this.movie[key] } });
  }

}
