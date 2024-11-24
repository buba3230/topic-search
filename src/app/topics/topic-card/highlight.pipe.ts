import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightSearchTermText'
})
export class HighLightSearchTermTextPipe implements PipeTransform {
  transform(value: string, searchTerm: string): string {
    if (!searchTerm || searchTerm=== '') {
      return value;
    }

    const searchWords = searchTerm.trim().split(/\s+/);
    let replacedValue = value;

    searchWords.forEach(word => {
      if (word !== '') {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        replacedValue = replacedValue.replace(regex, match => `<span class='highlight'>${match}</span>`);
      }
    });
    return replacedValue;
  }
}