import { Component , OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { NoteDataComponent } from '../note-data/note-data.component';
import { NoteService } from 'src/app/core/services/note.service';
import { Note } from 'src/app/note';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public dialog: MatDialog , private _NoteService:NoteService) {}

  notes:Note[]=[]
  value = '';

  openDialog() {
    const dialogRef = this.dialog.open(NoteDataComponent)!;

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'add'){
        this.getNotes();
      }
    });
  }

  ngOnInit(): void {
    this.getNotes()
  }

  getNotes():void{
    this._NoteService.getUserNotes().subscribe({
      next:(res)=>{
        if(res.message === 'success'){
          this.notes = res.Notes
          console.log(res.Notes);
        }
      }
    })
  }

  deleteNote( id:string, index : number):void{
    this._NoteService.deleteNote(id).subscribe({
      next:(res)=>{
        if(res.message === 'deleted')
        {
          console.log(res , index);
          this.getNotes()
          this.notes.splice(index,1)
          this.notes = [...this.notes]
        }
      }
    })
  }

  setData(note:Note):void{
    const matDialogRef =this.dialog.open(NoteDataComponent , {
      data:{note}
    })

    matDialogRef.afterClosed().subscribe({
      next:(res)=>{
        if(res === 'updated'){
          this.getNotes()
        }
      }
    })
  }


}




