import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mailFormatter',
  standalone: true
})
export class MailFormatterPipe implements PipeTransform {

  transform(value: any[], ...args: unknown[]): any {

    let temp: string = ""

    if (value.length > 0) {

      for (let i: number = 0; i < value.length; i++) {
        if (i != (value.length - 1))
          temp = temp + value[i] + ", "
        else
          temp = temp + value[i]
      }
    }else{
      temp = "Please enter mail id on previous page."
    }

    return temp;
  }

}
