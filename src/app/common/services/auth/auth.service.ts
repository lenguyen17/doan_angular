import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  HOST: string = 'http://localhost:3000';
  currentUser: User = new User();

  constructor(private httpClient: HttpClient) {
  }

  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(this.HOST + `/users?username=${username}`)
        .subscribe((res: any) => {
          let found = false;
          res.forEach((user: any) => {
            if (user.username === username && user.password === password) {
              this.currentUser = user;
              this.saveLocal();
              found = true;
              resolve(user);
            }
          });
          if (!found) {
            reject(new Error("Incorrect username or password"));
          }
        })
    });
  }

  logout() {
    this.currentUser = new User();
    localStorage.removeItem("MovieBooking-USER");
  }

  isLoggedIn() {
    this.readLocal();
    if (this.currentUser && this.currentUser.username) {
      return true;
    }
    return false;
  }

  register(data: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.HOST + `/users`, data)
        .subscribe((res: any) => {
          resolve(res);
        })
    });
  }

  selectUserByUsername(username: string) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(this.HOST + `/users?username=${username}`,)
        .subscribe((res: any) => {
          resolve(res);
        })
    });
  }

  saveLocal() {
    localStorage.setItem("MovieBooking-USER", JSON.stringify(this.currentUser));
  }

  readLocal() {
    try {
      let str = localStorage.getItem("MovieBooking-USER");
      if (str != null && str.length > 0) {
        this.currentUser = JSON.parse(str);
      }
    } catch (error) {
      console.log(error);
      this.currentUser = new User();
    }
  }
}
