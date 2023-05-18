import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  hide = true;
  constructor(private _FormBuilder:FormBuilder , private _AuthService:AuthService , private _Router:Router){}
  registerForm!:FormGroup
  createForm():void{
    this.registerForm = this._FormBuilder.group({
      first_name:['',[Validators.required]],
      last_name:['',[Validators.required]],
      email:['',[Validators.required , Validators.email , Validators.pattern(/(com|net)$/)]],
      age:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  register(formData:FormGroup){
    if(formData.valid){
      console.log(formData.value);
      this._AuthService.register(formData.value).subscribe({
        next:(res)=>{
          if(res.message == 'success'){
            this._Router.navigate(['/login'])
          }
        }
      })
    }
  }

  ngOnInit(): void {
    this.createForm()
  }
}
