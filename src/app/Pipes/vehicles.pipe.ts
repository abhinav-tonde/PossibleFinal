import { Pipe, PipeTransform } from '@angular/core';
import { Vehicle } from '../Entities/Vehicle';

@Pipe({
  name: 'vehicles',
  standalone: true
})
export class VehiclesPipe implements PipeTransform {

  transform(value: Vehicle[], ...args: unknown[]): any {

    let temp: string = ""

    if (value.length > 0) {
      for (let i: number = 0; i < 3; i++) {

        let lob: string = value[i].lob_name;

        if (i < 2)
          temp = temp + lob + ", "
        else
          temp = temp + lob
      }

      temp = `${temp} & ${value.length - 3} more`
    }else{
      temp = "No vehicles were selected."
    }

    return temp;
  }
}
