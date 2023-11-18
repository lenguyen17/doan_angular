interface SeatInterface {
    "seat_id": number,
    "position": string,
    "available": false,
    "price": number
}
interface DrinkInterface {
    "id": number,
    "price": number,
    "name": string
}
export class Bill {
    id: number = 0;
    movieId: number = 0;
    roomId: number = 0;
    movieTitle: string = "";
    date: string = "";
    time: string = "";
    seats: Array<SeatInterface> = [];
    drinks: Array<DrinkInterface> = [];
    total: number = 0;
    createdAt: string = "";
    constructor(
        id: number = 0,
        movieId: number = 0,
        roomId: number = 0,
        movieTitle: string = '',
        date: string = '',
        time: string = '',
        seats: Array<SeatInterface> = [],
        drinks: Array<DrinkInterface> = [],
        total: number = 0,
        createdAt: string = ''
    ) {
        this.id = id;
        this.movieId = movieId;
        this.roomId = roomId;
        this.movieTitle = movieTitle;
        this.date = date;
        this.time = time;
        this.seats = seats;
        this.drinks = drinks;
        this.total = total;
        this.createdAt = createdAt;
    }
}