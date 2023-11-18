import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillInfoComponent } from 'src/app/pages/bill-info/bill-info.component';
import { BillComponent } from 'src/app/pages/bill/bill.component';

const routes: Routes = [
  {
    path: '',
    component: BillComponent,
  },
  {
    path: ':id',
    component: BillInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRoutingModule { }
