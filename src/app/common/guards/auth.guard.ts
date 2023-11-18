import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
declare const Swal: any;

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if(!authService.isLoggedIn()){
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Bạn cần phải đăng nhập",
      showConfirmButton: false,
      timer: 1500
    });
    router.navigate(['auth/login']);
    return false;
  }else {
    return true;
  }
};
