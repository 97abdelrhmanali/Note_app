import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  constructor(private _FormBuilder:FormBuilder , private _AuthService:AuthService , private _Router:Router){}
  loginForm!:FormGroup
  createForm():void{
    this.loginForm = this._FormBuilder.group({
      email:['',[Validators.required , Validators.email , Validators.pattern(/(com|net)$/)]],
      password:['',[Validators.required]]
    })
  }

  login(formData:FormGroup){
    if(formData.valid){
      console.log(formData.value);
      this._AuthService.login(formData.value).subscribe({
        next:(res)=>{
          if(res.message == 'success'){
            localStorage.setItem('token',res.token)
            this._AuthService.userData();
            this._Router.navigate(['/home'])
          }
        }
      })
    }
  }

  ngOnInit(): void {
    this.createForm()
  }
}
