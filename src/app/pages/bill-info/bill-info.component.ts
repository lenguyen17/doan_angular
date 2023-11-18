import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bill } from 'src/app/common/models/bill.model';
import { BillService } from 'src/app/common/services/bill/bill.service';

@Component({
  selector: 'app-bill-info',
  templateUrl: './bill-info.component.html',
  styleUrls: ['./bill-info.component.scss']
})
export class BillInfoComponent {
  @Input() bill: Bill = new Bill();
  seats: string = '';
  width: number = 100;
  constructor(private route: ActivatedRoute, private billService: BillService) {
    this.route.paramMap.subscribe(params => {
      const id: number = Number(params.get('id'));
      if (id) {
        this.billService.getBillById(id)
          .then((data: any) => {
            this.bill = data;
            this.width = 25;
            this.getSeats();
          })
      }
    });
  }

  ngOnInit(): void {
    this.getSeats();
  }

  getSeats(): void {
    this.bill.seats.forEach((s: any) => {
      this.seats += s.position + " ";
    })
  }

}
