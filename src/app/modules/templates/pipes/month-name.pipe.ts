import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthName'
})
export class MonthNamePipe implements PipeTransform {

  private monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Augosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  transform(value: string): string {
    if (!value) return '';

    const parts = value.split('-');
    const month = parseInt(parts[1], 10) - 1; // Meses en JavaScript van de 0 a 11
    const year = parseInt(parts[2], 10);

    const date = new Date(value);
    return `${this.monthNames[month]} ${year}`;
  }

}
