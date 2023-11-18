import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from 'src/app/common/models/movie.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss']
})
export class MovieEditComponent {
  @Input() movie: Movie = new Movie();
  @Output() newMovieData = new EventEmitter();
  constructor(){}

  ngOnInIt() {
    
  }

  onSubmit(form: NgForm){
    if(form.valid){
      this.newMovieData.emit(form);
    }
  }



}
