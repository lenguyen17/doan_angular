import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillComponent } from 'src/app/pages/bill/bill.component';
// import { BookingComponent } from 'src/app/pages/booking/booking.component';
import { DetailMovieComponent } from 'src/app/pages/detail-movie/detail-movie.component';
import { MovieManagementComponent } from 'src/app/pages/movie-management/movie-management.component';
import { ShowtimesComponent } from 'src/app/pages/showtimes/showtimes.component';

const routes: Routes = [
  {
    path: 'manage',
    component: MovieManagementComponent
  },
  {
    path: ':id',
    component: DetailMovieComponent
  },
  {
    path: ':id/showtimes',
    component: ShowtimesComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
