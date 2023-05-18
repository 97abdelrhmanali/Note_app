import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { NoteService} from 'src/app/core/services/note.service';
import { Note } from 'src/app/note';

@Component({
  selector: 'app-note-data',
  templateUrl: './note-data.component.html',
  styleUrls: ['./note-data.component.scss']
})
export class NoteDataComponent implements OnInit{
  constructor(
  private _FormBuilder:FormBuilder,
  private _NoteService:NoteService,
  private _MatDialogRef:MatDialogRef<NoteDataComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any
  ){}

  dataForm!:FormGroup
  userData:any
  ngOnInit(): void {
    this.createForm()
    this.userData = jwtDecode(localStorage.getItem('token')||'')
    console.log(this.data);

  }

  createForm():void{
    this.dataForm = this._FormBuilder.group({
      title:[this.data ? this.data.note.title:'' , [Validators.required]],
      desc:[this.data ? this.data.note.desc:'',[Validators.required]],
      token:localStorage.getItem('token')
    })
  }

  sendData():void{
    if(this.dataForm.valid){

      if(this.data === null)
        this.addNote()
      else{
        this.updateNote()
      }

    }
  }


  addNote():void{

    const data = {
      ...this.dataForm.value,
      citizenID:this.userData._id
    }
    console.log(data);

    this._NoteService.addNote(data).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message === 'success'){
          this._MatDialogRef.close("add")
        }
      }
    })
  }



  updateNote():void{
    const model={
      ...this.dataForm.value,
      NoteID:this.data.note._id,
      token:localStorage.getItem('token')
    }
    this._NoteService.updateNote(model).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message === 'updated'){
          this._MatDialogRef.close('updated')
        }

      }
    })
  }
}
