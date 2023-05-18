import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menuName : string = 'Login';

  constructor(private _Router:Router , public _AuthService:AuthService){
    this._Router.events.subscribe(
      {
        next:(res)=>{
          if(res instanceof NavigationEnd){
            this.menuName = res.url.replace('/','')
          }

        }
      }
    )
  }
}
