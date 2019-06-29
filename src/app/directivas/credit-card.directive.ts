import { Directive, HostListener, ElementRef } from '@angular/core';

/**Directiva utilizada para dar formato al campo de entrada para el número de la tarjeta*/
@Directive({
  selector: '[appCreditCard]'
})
export class CreditCardDirective {

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    let trimmed = input.value.replace(/\s+/g, '');

    let numbers = [];
    for (let i = 0; i < trimmed.length; i += 4) {
      numbers.push(trimmed.substr(i, 4));
    }

    input.value = numbers.join(' ');
  }
}
