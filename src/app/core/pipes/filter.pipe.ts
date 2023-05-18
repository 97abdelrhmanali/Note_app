import { Pipe, PipeTransform } from '@angular/core';
import { Note } from 'src/app/note';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(notes:Note[] , term:string): Note[] {
    return notes.filter(note => note.title.toLowerCase().includes(term.toLowerCase()));
  }

}
