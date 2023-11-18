export class Movie {
    id: number = 0;
    title: string = '';
    poster_path: string = '';
    overview: string = ''; 
    runtime: number = 0;
    video_url: string = '';
    vote_average: number = 0;
    showtimes: Array<any> = [];
    constructor(id: number = 0, title: string ='', poster_path: string = '', overview: string = '', 
                runtime: number = 0, video_url: string = '', vote_average: number = 0, showtimes: Array<any> = []){
        this.id = id;
        this.title = title;
        this.poster_path = poster_path;
        this.overview = overview;
        this.runtime = runtime;
        this.video_url = video_url;
        this.vote_average = vote_average;
        this.showtimes = showtimes;
    }
}