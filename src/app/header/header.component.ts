import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiciosTokenService } from '../servicios/servicios-token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged = false;
  isAdmin = false;
  isUser = false;
  autent = false;

  constructor(private tokenService: ServiciosTokenService) { }
  suscription: Subscription = new Subscription();

  ngOnInit(): void {
  }

  autentificado():boolean{
    if(this.isLogged && this.isUser){
      return true;
    }else{
      return false;
    }
  }

  logout() {
    this.tokenService.logOut();
  }

}
