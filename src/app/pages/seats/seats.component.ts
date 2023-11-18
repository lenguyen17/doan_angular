import { Component,EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss']
})
export class SeatsComponent {
  @Input() seatsStatus: Array<any> = [];
  @Output() selectedSeats: EventEmitter<any> = new EventEmitter();
  
  seatsSelected: Array<string> = [];
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.seatsStatus.forEach(element => {
      if (!element.available) {
        let btn: any = document.getElementById(element.position);
        btn.disabled = true;
        btn.className = 'btn btn-dark mx-2';
      }
    });
  }

  selectSeat(position: any):void {
    const isSeatSelected = this.seatsSelected.includes(position);
    // Nếu ghế chưa được chọn, thêm vào mảng
    if (!isSeatSelected) {
      this.seatsSelected.push(position);
      this.seatsStatus.find(s => s.position === position).available = false;
    } else {
      // Nếu ghế đã được chọn, loại bỏ khỏi mảng
      this.seatsSelected = this.seatsSelected.filter(seat => seat !== position);
      this.seatsStatus.find(s => s.position === position).available = true;
    }
    this.emitSeats();
  }

  emitSeats() {
    let data: Array<any> = this.seatsStatus.filter((s)=> this.seatsSelected.includes(s.position))
    this.selectedSeats.emit(data);
  }


}
