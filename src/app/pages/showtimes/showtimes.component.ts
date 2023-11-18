import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/common/models/movie.model';
import { MovieService } from 'src/app/common/services/movie/movie.service';
declare const Swal: any;
@Component({
  selector: 'app-showtimes',
  templateUrl: './showtimes.component.html',
  styleUrls: ['./showtimes.component.scss']
})
export class ShowtimesComponent {
  movie: Movie = new Movie();
  constructor(private route: ActivatedRoute, private movieService: MovieService) { }
  listDate: Array<any> = [];
  seatsStatus: Array<any> = [];
  ngOnInit() {
    // localhost:4200/movies/:id/showtimes      
    this.route.paramMap.subscribe(params => {
      const id: number = Number(params.get('id'));
      console.log('id :>> ', id);
      this.movieService.getMovieById(id)
        .then((data: any) => {
          console.log('data :>> ', data);
          this.movie = data;
          this.sortDateData();
          this.createDateData();
        })
    });
  }

  viewSeatStatus(item: any): void {
    this.viewSeatStatus = item.seat_status;
  }

  deleteShowtimes(item: any): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
      .then((result: any) => {
        if (result.isConfirmed) {
          for (let i = 0; i < this.movie.showtimes.length; i++) {
            let showtimes = this.movie.showtimes[i];
            if (showtimes.show_id === item.show_id) {
              for (let j = 0; j < showtimes.times.length; j++) {
                if (showtimes.times[j].room_id === item.room) {
                  this.movie.showtimes[i].times.splice(j, 1);
                  if (this.movie.showtimes[i].times.length === 0) {
                    this.movie.showtimes.splice(i, 1);
                  }
                  this.movieService.updateMovie(this.movie);
                  this.createDateData();
                  break;
                }
              }
            }
          }
        }
      });
  }

  sortDateData(): void {
    this.movie.showtimes = this.movie.showtimes.sort((a: any, b: any) => {
      const [dayA, monthA, yearA] = a.date.split('/');
      let timeA = new Date(yearA, monthA - 1, dayA);
      const [dayB, monthB, yearB] = b.date.split('/');
      let timeB = new Date(yearB, monthB - 1, dayB);
      return timeA.getTime() - timeB.getTime();
    })
  }

  createDateData(): void {
    this.listDate = [];
    this.movie.showtimes.forEach((item: any) => {
      item.times.forEach((t: any) => {
        let bookedChairs = t.seat_status.filter((j: any) => !j.available).length;
        this.listDate.push({
          show_id: item.show_id,
          date: item.date,
          time: t.time,
          room: t.room_id,
          bookedChairs: bookedChairs + ' / ' + t.seat_status.length,
          seat_status: t.seat_status
        });
      });
    });
  }
}
