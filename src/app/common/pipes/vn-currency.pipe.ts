import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vnCurrency'
})
export class VnCurrencyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    const formattedValue = new Intl.NumberFormat('en-us', {minimumFractionDigits: 0}).format(Number(value));
    return formattedValue + " đ";
  }

}
