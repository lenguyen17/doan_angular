import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { BookingService } from '../booking/booking.service';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  HOST: string = 'http://localhost:3000';
  constructor(private httpClient: HttpClient,bookService: BookingService) {
  }

  getMovieById(id: number): any {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.HOST + `/movies/${id}`)
        .subscribe((res: any) => {
          resolve(res);
        })
    });
  }

  getListMovie(): any {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(this.HOST + `/movies`)
        .subscribe((res: any) => {
          resolve(res);
        })
    })
  }

  postMovie(body: any) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.HOST + `/movies`, body)
      .subscribe({
        next: (res: any) => resolve(res),
        error: (error: any) => reject(error),
      }) 
    })

  }
  
  updateMovie(movie: Movie) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .patch(this.HOST + `/movies/${movie.id}`, { ...movie })
        .subscribe({
          next: (res: any) => resolve(res),
          error: (error: any) => reject(error),
        })
    })
  }

  deleteMovie(movie: Movie) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .delete(this.HOST + `/movies/${movie.id}`)
        .subscribe({
          next: (res: any) => resolve(res),
          error: (error: any) => reject(error),
        })
    })
  }

  updateSeatStatus(idMovive: number, idShow: number, idRoom: number, arrSeatsId: Array<any>) {
    // console.log("movie: " + idMovive + " show: " + idShow + " room: " + idRoom + " idSeat: " + idSeat);
    console.log(arrSeatsId)
    return this.getMovieById(idMovive)
      .then((res: any) => {
        res.showtimes.find((show: any) => show.show_id === idShow)
          .times.find((time: any) => time.room_id === idRoom)
          .seat_status.forEach((seat: any) => {
            if(arrSeatsId.includes(seat.seat_id)){
              seat.available = false;
            }
          });
        return new Promise((resolve, reject) => {
          this.httpClient.patch(this.HOST + `/movies/${idMovive}`, res)
            .subscribe((data: any) => {
              resolve(data);
            })
        });
      })
  }

  insertShowtimes(data: any) {
    let inputDate = this.formatDate(data.date);

    return new Promise((resolve, reject) => {
      this.getRoomById(data.room)
        .then((room: any) => {
          // Set price for room
          room.price = data.price;
          this.getMovieById(data.movieId)
            .then((movie: any) => {
              // if Date is existed
              let objData = {
                "room_id": Number(data.room),
                "time": data.time,
                "seat_status": [...room.seat_status]
              }
              if (movie.showtimes.find((st: any) => st.date === inputDate)) {
                movie.showtimes.find((st: any) => st.date === inputDate).times.push(objData);
                this.updateMovie(movie)
                  .then((res: any) => resolve(res));
              } else {
                // if dont, crete new date
                movie.showtimes.push({
                  "show_id": Date.now(),
                  "date": inputDate,
                  "times": [objData]
                })
                this.updateMovie(movie)
                  .then((res: any) => resolve(res));
              }
            })
        })
    })
  }

  formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Lưu ý: tháng bắt đầu từ 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  getRoomById(id: number) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.HOST + `/rooms/${id}`)
        .subscribe((res: any) => {
          resolve(res);
        })
    });
  }
}
