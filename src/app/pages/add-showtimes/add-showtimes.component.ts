import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Movie } from 'src/app/common/models/movie.model';
import { BookingService } from 'src/app/common/services/booking/booking.service';
declare const Swal: any;
@Component({
  selector: 'app-add-showtimes',
  templateUrl: './add-showtimes.component.html',
  styleUrls: ['./add-showtimes.component.scss']
})
export class AddShowtimesComponent {
  @Input() movie: Movie = new Movie();
  @Output() emitCreateShowtimes: EventEmitter<any> = new EventEmitter();
  date: string = '';
  time: string = '';
  room: number = 0;
  movieId: number = 0;
  price: number = 0;
  rooms: Array<any> = [];
  constructor(
    private bookService: BookingService,
  ){}

  ngOnInit(): void {
    this.bookService.getRooms()
          .then((data: any)=> this.rooms = data);
  }

  getDate(event: any): void {
    this.date = event.target.value;
  }

  getTime(event: any): void {
    this.time = event.target.value;
  }

  onSubmitCreateShowtimes(frm: NgForm): void{
      if(frm.valid && frm.value.room != 0){
        frm.value.movieId = this.movie.id;
        this.emitCreateShowtimes.emit(frm.value);
      }else {
        Swal.fire({
          title: "Warning!",
          text: "You can not leave input fields ",
          icon: "warning"
        });
      }
  }
  
}
