import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bill } from '../../models/bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  HOST: string = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {
  }

  getAllBill(): any {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.HOST + `/bills`)
        .subscribe((res: any) => {
          resolve(res);
        })
    });
  }

  getBillById(id: number): any {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.HOST + `/bills/${id}`)
        .subscribe({
          next: (res: any) => resolve(res),
          error: (error: any) => reject(error),
        })
    });
  }

  createBill(body: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.HOST + '/bills', body)
        .subscribe({
          next: (res: any) => resolve(res),
          error: (error: any) => reject(error),
        })
    });

  }

  deleteBill(bill: Bill) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .delete(this.HOST + '/bills/' + bill.id)
        .subscribe((res) => {
          resolve(res);
        })
    });

  }

}
