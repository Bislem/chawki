import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datePipe'
})
export class DatePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return moment(value * 1000).format('D MMM YYYY');
  }

}
