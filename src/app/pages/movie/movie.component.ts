import { Component } from '@angular/core';
import { Movie } from 'src/app/common/models/movie.model';
import { MovieService } from 'src/app/common/services/movie/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {
  listMovie: Movie[] = [];
  searchedMovie: Movie[] = [];
  searchTxt: string = '';
  constructor(private movieService: MovieService) {
  }
  ngOnInit(): void {
    this.movieService.getListMovie()
      .then((data: any) => {
        this.listMovie = data;
        this.searchedMovie = [...this.listMovie];
      })
  }
  searchMovie(){
    console.log('changed search', this.searchTxt);
    this.searchedMovie = this.listMovie.filter(movie => movie.title.toLowerCase().includes(this.searchTxt.toLowerCase()));
    if(this.searchedMovie.length == 0) {
      this.searchedMovie = [...this.listMovie];
    }
  }
}
