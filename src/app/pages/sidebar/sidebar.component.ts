import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth/auth.service';
declare const Swal: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuIndex: number = 0;
  constructor(
    private renderer: Renderer2, 
    private authService: AuthService,
    private router: Router  
  ) {  };

  ngOnInit() {
  }

  opentMenu(index:number){
    this.menuIndex = index;
    if(this.menuIndex == 1){
      console.log('opentMenu');
    }
  }

  logout():void {
    this.authService.logout();
    this.router.navigate(['auth/login']);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "You have logged out",
      showConfirmButton: false,
      timer: 1500
    });
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
