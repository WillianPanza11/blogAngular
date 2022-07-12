import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CargarScriptsService } from '../cargar-scripts.service';
import { User } from '../interface/User';
import { PostControllerService, PostDto, Usuario } from '../ServiceSwagger';
import { ServiciosTokenService } from '../servicios/servicios-token.service';

@Component({
  selector: 'app-hogar',
  templateUrl: './hogar.component.html',
  styleUrls: ['./hogar.component.css']
})
export class HogarComponent implements OnInit {

  posts!: Observable<Array<PostDto>>;
  listAll?: PostDto[] =[];
  roles: string[] = [];

  isLogged = false;
  isAdmin = false;
  isUser = false;
  autent = false;
  isLoginFail = false;

  nombreUsuario!: string;

  constructor(private postService: PostControllerService, private cargarScrip: CargarScriptsService,
    private tokenService: ServiciosTokenService, private toastr: ToastrService) {
    this.cargarScrip.carga(["/principal"])
   }

  ngOnInit() {
    this.listar();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      const usuario: User = JSON.parse(localStorage.getItem('user')!);
      this.nombreUsuario = usuario.nombre;
    } else {
      this.isLogged = false;
    }
  }

  listar(){
    this.postService.listarPostUsingGET().subscribe(data => {
      if (data){
        this.listAll = data.object;
      }
    },err=>{
      this.toastr.error('ERROR AL CARGAR LOS POSTS', 'VUELVA A RECARGAR LA PÁGINA');
    })
  }

  logout() {
    localStorage.removeItem('user');
    this.tokenService.logOut();
  }

}
