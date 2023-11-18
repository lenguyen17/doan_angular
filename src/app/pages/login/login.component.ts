import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { Router } from '@angular/router';
declare const Swal: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isShowed: boolean = false;
  regisUsername: string = '';
  regisName: string = '';
  regisPassword: string = '';
  constructor(public authService: AuthService, private router: Router) { }
  onSubmitLogin(frm: NgForm) {
    if (frm.valid) {
      this.authService.login(this.username, this.password)
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Register success",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/home']);
        })
        .catch(err => {
          alert(err.message);
        });
    }
  }

  onSubmitRegister(frm: NgForm) {
    if (frm.valid) {
      this.authService.selectUserByUsername(frm.value.regisUsername)
        .then((res: any) => {
          if (res.length === 0) {
            let data = {
              id: Date.now(),
              username: frm.value.regisUsername,
              password: frm.value.regisPassword,
              name: frm.value.rsName
            }
            this.authService.register(data)
              .then((res: any) => {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Register success",
                  showConfirmButton: false,
                  timer: 1500
                });
                this.username = res.username;
                this.password = res.password;
                document.getElementById("toggle-slide")?.click();
                frm.reset();
              })
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Username is already exists",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
    }
  }

  showPassword() {
    this.isShowed = !this.isShowed;
  }
}
