import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent {
  @Input() drinks: Array<any> = [];
  @Output() selectedDrinks: EventEmitter<any> = new EventEmitter();
  
  constructor(){}

  selectDrinks(drink:any){
    this.selectedDrinks.emit(drink);
  }
}
