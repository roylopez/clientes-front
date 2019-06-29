import { Pipe, PipeTransform } from '@angular/core';

/**Tubería para dar formato al campo de entrada tarjeta de crédito*/
@Pipe({
  name: 'numeroTarjetaPipe'
})
export class NumeroTarjetaPipe implements PipeTransform {
  transform(value: string): string {
    if(value.length == 16) {
      let newValue = '';
      for(let i = 0; i < 16; i+=4) {
        newValue = newValue.concat(value.substring(i, i + 4));
        if(i < 12) {
          newValue = newValue.concat(" ");
        }
      }
      return newValue;
    }
    return value;
  }
}
