import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/common/models/movie.model';
import { MovieService } from 'src/app/common/services/movie/movie.service';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.scss']
})
export class DetailMovieComponent {
  movie: Movie = new Movie();
  showBooking: boolean = false;
  showTrailer: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService, ){}

  ngOnInit() {
    // localhost:4200/movies/:id      
    this.route.paramMap.subscribe(params => {
      const id:number = Number(params.get('id'));
      this.movieService.getMovieById(id)
        .then((data:any )=> {
          this.movie = data ;
          let container:any = document.getElementById('box-movie');
            container.innerHTML += `<iframe width="100%" height="500px" src=" ${this.movie.video_url} " title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `;
        })  
    });
    
  }

  closeModal(){
    let closeBtn: any = document.getElementById('close-modal-btn');
    closeBtn.click();
  }

}
