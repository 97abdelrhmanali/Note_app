import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Auth } from '../enviroments/auth';
import { AuthService } from './auth.service';
import { Note } from 'src/app/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  baseURL :string = Auth.baseURL
  constructor(private _HttpClient:HttpClient , private _AuthService:AuthService) { }

  addNote(formData: object):Observable<any>{
    return this._HttpClient.post(this.baseURL + 'addNote' , formData)
  }

  updateNote(formData: object):Observable<any>{
    return this._HttpClient.put(this.baseURL + 'updateNote' , formData)
  }

  getUserNotes():Observable<any>{
    return this._HttpClient.post(this.baseURL + 'getUserNotes',{
      token:localStorage.getItem('token'),
      userID : this._AuthService.user.getValue()._id
    })
  }

  deleteNote(id:string):Observable<any>{
    return this._HttpClient.delete(this.baseURL + 'deleteNote',{
      body:{
        token:localStorage.getItem('token'),
        NoteID : id
      }
    })
  }

}
