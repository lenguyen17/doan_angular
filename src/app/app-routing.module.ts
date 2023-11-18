import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MovieComponent } from './pages/movie/movie.component';
import { authGuard } from './common/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MovieComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'movies',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/movie/movie.module').then((m) => m.MovieModule),
      
  },  
  {
    path: 'bills',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/bill/bill.module').then((m) => m.BillModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
