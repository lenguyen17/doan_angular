import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Movie } from 'src/app/common/models/movie.model';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.scss']
})
export class MovieAddComponent {
  movie:Movie = new Movie();
  isValidate:boolean = false;
  @Output() addNewMovie = new EventEmitter();
  constructor(){}

  ngOnInIt() {
    
  }
  
  onSubmit(form: NgForm){
    this.isValidate = true;
    if(form.valid){
      this.isValidate = false;
      this.addNewMovie.emit(this.movie);
      form.reset();
    }
  }
}
