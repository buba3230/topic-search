import { Pipe, PipeTransform } from '@angular/core';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

@Pipe({
 name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

    private dayWithSuffix(day: number): string{
    if (day === 1) {
        return `${day}st`
    } else if (day === 2) {
        return `${day}nd`
    } else {
        return `${day}th`
    }
    }

transform(value: Date): string {
    const month = monthNames[value.getMonth()];
    const day = this.dayWithSuffix(value.getDate());
    const year = value.getFullYear();
    return `${month} ${day}, ${year}`;
   }
}