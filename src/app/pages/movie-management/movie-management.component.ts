import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from 'src/app/common/models/movie.model';
import { MovieService } from 'src/app/common/services/movie/movie.service';

declare const Swal: any;
@Component({
  selector: 'app-movie-management',
  templateUrl: './movie-management.component.html',
  styleUrls: ['./movie-management.component.scss']
})
export class MovieManagementComponent {
  listMovie: Movie[] = [];
  listMovieSearch: Movie[] = [];
  searchTxt:string = '';
  constructor(private movieService: MovieService, private router: Router) { }
  movie: Movie = new Movie();
  ngOnInit(): void {
    this.movieService.getListMovie()
      .then((data: any) => {
        // let trum = ;
        this.listMovie = data;
        this.listMovieSearch = [...data];
        this.movie = data[0];
      })

  }

  showMovie(movie: Movie): void {
    this.movie = movie;
  }

  searchMovie() {
    this.listMovieSearch = this.listMovie.filter((item) => {
      return item.title.toLowerCase().includes(this.searchTxt.toLowerCase().trim())
    })
    this.listMovieSearch = this.listMovieSearch.length? this.listMovieSearch : [...this.listMovie];
  }

  redirectTo(id: number): void {
    this.router.navigate([`movies/${id}/showtimes`]);
  }
  addNewMovie(data: any) {
    let btnClose: any = document.getElementById('closeAddNewMovieModal');
    btnClose.click();
    delete data.id;
    this.movieService.postMovie(data)
    .then((res: any) => {
      // add to listMovie
      this.listMovie.unshift(res);
      this.listMovieSearch = [...this.listMovie];
      // notice
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
    }).catch((err) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed action",
        showConfirmButton: false,
        timer: 1500
      });
      console.log(err);
    });
  }
  
  updateMovie(data: any): void {
    let btnClose: any = document.getElementById('closeModal');
    btnClose.click();
    this.movieService.updateMovie(data)
      .then((res: any) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        console.log(res);
      })
      .catch((err: any) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed action",
          showConfirmButton: false,
          timer: 1500
        });
        console.log(err);
      });
  }

  deleteMovie(movie: Movie) {
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
          this.movieService.deleteMovie(movie)
            .then((data: any) => {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              this.listMovie = this.listMovie.filter((item: any) => item.id !== movie.id);
              this.listMovieSearch = [...this.listMovie]; 
              if (!this.listMovie) {
                this.listMovie = [];
                this.listMovieSearch = []; 
              }
            })
            .catch((error: any) => {
              Swal.fire({
                title: "Error!",
                text: "Failed action.",
                icon: "error"
              });
              console.log(error);
            });
        }
      });
  }

  addShowTimes(movie: Movie): void {
    this.movie = movie;
  }

  createShowtimes(data: any): void {
    console.log('insertShowtimes :>> ', data);
    this.movieService.insertShowtimes(data)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Created new showtimes.",
          icon: "success"
        });
        console.log(data)

      });
    let btn = document.getElementById('closeModalSt');
    btn?.click();
  }
  


}
