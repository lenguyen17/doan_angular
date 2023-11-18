import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/common/models/movie.model';
import { BillService } from 'src/app/common/services/bill/bill.service';
import { BookingService } from 'src/app/common/services/booking/booking.service';
import { MovieService } from 'src/app/common/services/movie/movie.service';
declare const $: any;
declare const Swal: any;
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  @Input() movie: Movie = new Movie();
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  drinks: Array<any> = [];
  drinksSelected: Array<any> = [];
  seatsSelected: Array<any> = [];
  selectedDate: number = 0;
  selectedTime: number = 0;
  currentPage: number = 1;
  ticketTotal = 0;
  drinksTotal = 0;
  total: number = 0;
  constructor(
    private bookingsService: BookingService,
    private movieService: MovieService,
    private billService: BillService,
    private router: Router,
  ) { }
  ngOnInit() {
    this.bookingsService.getDrinks()
      .then((data: any) => this.drinks = data)
  }

  selectDate(index: number): void {
    this.selectedDate = index;
    this.selectedTime = -1;
  }

  selectTime(index: number): void {
    if (index < this.movie.showtimes[this.selectedDate].times.length) {
      this.selectedTime = index;
    } else {
      this.selectedTime = -1;
    }
  }

  selectDrinks(drink: any): void {
    let temp = this.drinksSelected.find((d) => d.id === drink.id);
    if (temp) {
      this.drinksSelected = this.drinksSelected.filter((d) => d.id !== drink.id);
      if (!this.drinksSelected) {
        this.drinksSelected = [];
      }
    } else {
      this.drinksSelected.push(drink);
    }
    this.tongtien();
  }

  selectSeats(seats: any) {
    this.seatsSelected = [...seats];
    this.tongtien();
  }

  tongtien() {
    this.ticketTotal = this.seatsSelected.reduce((acc: number, cur: any) => acc + cur.price, 0);
    this.drinksTotal = this.drinksSelected.reduce((acc: number, cur: any) => acc + cur.price, 0);
    this.total = this.ticketTotal + this.drinksTotal;
  }

  thanhtoan() {
    let temp: Array<any> = [];
    this.drinksSelected.forEach((drink: any) => temp.push({
      id: drink.id,
      price: drink.price,
      name: drink.name
    }));

    this.tongtien();
    const now = new Date();
    const formattedDate = now.toLocaleString();
    let finalData: any = {
      id: Date.now(),
      movieId: this.movie.id,
      roomId: this.movie.showtimes[this.selectedDate].times[this.selectedTime].room_id,
      movieTitle: this.movie.title,
      date: this.movie.showtimes[this.selectedDate].date,
      time: this.movie.showtimes[this.selectedDate].times[this.selectedTime].time,
      seats: this.seatsSelected,
      drinks: temp,
      total: this.total,
      createdAt: formattedDate,
    }
    console.log(finalData);
    this.closeModal.emit();
    this.billService.createBill(finalData)
      .then((result) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Payment success",
          showConfirmButton: false,
          timer: 1500
        });
        let arrSeatsId = this.seatsSelected.map((seat) => seat.seat_id);
        this.movieService.updateSeatStatus(this.movie.id, this.movie.showtimes[this.selectedDate].show_id,
          this.movie.showtimes[this.selectedDate].times[this.selectedTime].room_id, arrSeatsId);

        
      });
    this.router.navigate([`bills/${finalData.id}`]);

  }
  prevPageAction(): void {
    if (this.currentPage != 1) {
      this.currentPage--;
      const buttonElement: HTMLButtonElement | null = document.getElementById("prev-btn") as HTMLButtonElement;
      buttonElement.click();
    }

  }
  nextPageAction(): void {
    if (this.checkCurrentPage()) {
      this.currentPage++;
      const buttonElement: HTMLButtonElement | null = document.getElementById("next-btn") as HTMLButtonElement;
      buttonElement.click();
    }
  }

  checkCurrentPage(): boolean {
    switch (this.currentPage) {
      case 1:
        if (this.selectedDate < 0 || this.selectedTime < 0) {
          alert("Please select Date & Time");
          return false;
        } else {
          return true;
        }
      case 2:
        if (this.seatsSelected.length <= 0) {
          alert("Bạn chưa chọn chổ");
          return false;
        }
        return true;
    }
    return true;
  }
}
