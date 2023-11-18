import { Component } from '@angular/core';
import { BillService } from 'src/app/common/services/bill/bill.service';
import { Bill } from 'src/app/common/models/bill.model';
import { ActivatedRoute, Router } from '@angular/router';
declare const Swal: any;
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent {

  bills: Bill[] = [];
  currentBill: Bill = new Bill();
  searchBills: Bill[] = [];
  fromDate: Date = new Date();
  toDate: Date = new Date();
  constructor(
    private billService: BillService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = Number(params.get('id'));

    });

    this.billService.getAllBill()
      .then((data: any) => {
        this.bills = data;
        if (this.bills.length > 0) {
          this.bills = this.bills.sort((a: Bill, b: Bill) => {
            let timeA = new Date(a.createdAt).getTime();
            let timeB = new Date(b.createdAt).getTime();
            // Sort desc
            return timeB - timeA;
          })
        }
        this.searchBills = [...this.bills];
      })
  }

  redirectTo(id: number) {
    this.router.navigate([`movies/${id}`])
  }

  search() {
    // console.log(this.fromDate.getTime());
    let fromDate = new Date(this.fromDate);
    let toDate = new Date(this.toDate);
    fromDate.setHours(0, 0, 0, 0);
    toDate.setHours(0, 0, 0, 0);
    this.searchBills = this.bills.filter(bill => {
      let billDate = new Date(bill.createdAt);
      billDate.setHours(0, 0, 0, 0);
      return billDate >= fromDate && billDate <= toDate;
    });
  }

  getTotal(){
    return this.searchBills.reduce((total, bill) => total + bill.total,0);
  }

  deleteBill(bill:Bill) {
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
        this.billService.deleteBill(bill)
          .then((res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Deleted",
              showConfirmButton: false,
              timer: 1500
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }



}
