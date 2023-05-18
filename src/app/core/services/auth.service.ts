import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Auth } from '../enviroments/auth';
import { BehaviorSubject,Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL :string = Auth.baseURL
  user:BehaviorSubject<any> = new BehaviorSubject(null)
  loginCheck:BehaviorSubject<any> = new BehaviorSubject(false)

  constructor(private _HttpClient:HttpClient , private _Router:Router) {
    this.userData();
  }

  register(formData : object):Observable<any>{
    return this._HttpClient.post(this.baseURL+'signup', formData)
  }



  login(formData : object):Observable<any>{
    return this._HttpClient.post(this.baseURL+'signin', formData)
  }

  userData():void{
    let token = localStorage.getItem('token')
    if(token != null){
      let decoded = jwtDecode(token);
      this.loginCheck.next(true);
      try {
        this.user.next(decoded);
        this._Router.navigate(['/home']);
        console.log(decoded);
      } catch (error:any) {
        if(error.message){
          this.logout()
        }
      }

    }
  }

  logout():void{
    this.loginCheck.next(false);
    localStorage.removeItem('token');
    console.log(this.loginCheck.value);

    this._Router.navigate(['/login'])
  }

}
