import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  HOST: string = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) { }

  getShowTimeById(id: number) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.HOST + `/movies/${id}`)
      .subscribe((res: any) => {
        resolve(res.showtime);
      })
    });
  }

  getDrinks() {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.HOST + `/drinks`)
        .subscribe((res: any) => {
          resolve(res);
        })
    });
  }

  getRooms(){
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.HOST + `/rooms`)
        .subscribe((res: any) => {
          resolve(res);
        })
    });
  }
}
