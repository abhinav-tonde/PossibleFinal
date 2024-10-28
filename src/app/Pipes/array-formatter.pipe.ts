import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeFormatter',
  standalone: true
})
export class TypeFormatterPipe implements PipeTransform {

  transform(value: any[], ...args: unknown[]): any {

    let temp: string = ""

    if (value.length > 0) {
      for (let i: number = 0; i < value.length; i++) {
        if (i != (value.length - 1))
          temp = temp + value[i].type + ", "
        else
          temp = temp + value[i].type
      }
    }else{
      temp = "Select the type of report on previous page."
    }

    return temp;
  }

}
