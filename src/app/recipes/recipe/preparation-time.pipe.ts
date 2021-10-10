import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preparationTime'
})
export class PreparationTimePipe implements PipeTransform {

  transform(value: number): string {

    const num = value;
    const hours = (num / 60);
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);

    return `${rhours}h ${rminutes}m`;
  }
}
