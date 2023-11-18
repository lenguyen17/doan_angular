import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MovieComponent } from './pages/movie/movie.component';
import { DetailMovieComponent } from './pages/detail-movie/detail-movie.component';
import { MovieModule } from './modules/movie/movie.module';
import { BookingComponent } from './pages/booking/booking.component';
import { SeatsComponent } from './pages/seats/seats.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { MovieManagementComponent } from './pages/movie-management/movie-management.component';
import { MovieEditComponent } from './pages/movie-edit/movie-edit.component';
import { VnCurrencyPipe } from './common/pipes/vn-currency.pipe';
import { ShowtimesComponent } from './pages/showtimes/showtimes.component';
import { BillComponent } from './pages/bill/bill.component';
import { BillInfoComponent } from './pages/bill-info/bill-info.component';
import { AddShowtimesComponent } from './pages/add-showtimes/add-showtimes.component';
import { MovieAddComponent } from './pages/movie-add/movie-add.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    MovieComponent,
    DetailMovieComponent,
    BookingComponent,
    SeatsComponent,
    DrinksComponent,
    MovieManagementComponent,
    MovieEditComponent,
    MovieAddComponent,
    VnCurrencyPipe,
    ShowtimesComponent,
    BillComponent,
    BillInfoComponent,
    AddShowtimesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MovieModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
