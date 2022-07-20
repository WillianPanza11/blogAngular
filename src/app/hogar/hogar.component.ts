import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CargarScriptsService } from '../cargar-scripts.service';
import { User } from '../interface/User';
import { PostControllerService, PostDto, PostDtoOnly, SeccionesControllerService, SeccionesDto, Usuario } from '../ServiceSwagger';
import { ServiciosTokenService } from '../servicios/servicios-token.service';

@Component({
  selector: 'app-hogar',
  templateUrl: './hogar.component.html',
  styleUrls: ['./hogar.component.css'],
})
export class HogarComponent implements OnInit, CanActivate, OnDestroy {

  private unsuscribes$ = new Subject<void>();
  posts!: Observable<Array<PostDto>>;
  listAll?: PostDto[] = [];
  secciones?: SeccionesDto[] = [];
  roles: string[] = [];
  realRoles!: string;

  isLogged = false;
  isAdmin = false;
  isUser = false;
  autent = false;
  isLoginFail = false;

  nombreUsuario!: string;
  listAllSecc: boolean = true;
  opcionSeleccionado: string = 'TODO';
  verSeleccion: string = '';

  objSeccion: SeccionesDto = {
    //idSecciones: 0,
    nombre: '',
  }

  postDtoOnly?: PostDtoOnly[] = [];

  constructor(private postService: PostControllerService, private cargarScrip: CargarScriptsService,
    private tokenService: ServiciosTokenService, private toastr: ToastrService,
    private router: Router,  private seccionSevice: SeccionesControllerService) {
    this.cargarScrip.carga(["/principal"])
  }

  ngOnDestroy(): void {
    this.unsuscribes$.complete();
    this.unsuscribes$.next();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data['expectedRol'];
    const roles = this.tokenService.getAuthorities();
    this.realRoles = 'user';
    roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.realRoles = 'admin';
      }
    });
    if (!this.tokenService.getToken() || expectedRol.indexOf(this.realRoles) === -1) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

  ngOnInit() {
    this.listarSecciones('');
    this.listar();
    this.listarSeccionAdmin();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      const usuario: User = JSON.parse(localStorage.getItem('user')!);
      this.nombreUsuario = usuario.nombre;

    } else {
      this.isLogged = false;
    }

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
        this.listarSecciones('ADMIN');
      }
    })
  }

  listar() {
    this.postService.listarPostUsingGET().pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
      if (data) {
        this.listAll = data.object;
        this.listAllSecc = true;
      }
    }, err => {
      this.toastr.error('ERROR AL CARGAR LOS POSTS', 'VUELVA A RECARGAR LA PÁGINA');
    })
  }

  logout() {
    localStorage.removeItem('user');
    sessionStorage.clear();
    this.tokenService.logOut();
  }

  listarSecciones(adminUser: string) {
    this.seccionSevice.listarSeccionesUsingGET(adminUser).pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
      if (data.object) {
        this.secciones = data.object;
      } else {
        this.toastr.error('ERROR AL CARGAR LISTA DE OPCIONES', 'ERROR');
      }
    });
  }

  SelectSeleccionado() {
    this.verSeleccion = this.opcionSeleccionado;
    this.listarPostBySeccion(this.verSeleccion);
    console.log(this.verSeleccion);

  }

  listarPostBySeccion(seccion: string) {
    if (seccion != 'TODO') {
      this.postService.findAllBySeccionUsingGET(seccion).pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
        if (data.object) {
          this.listAll = data.object;
          this.listAllSecc = false;
        } else {
          this.listAllSecc = true;
          this.toastr.error('ERROR AL CARGAR LOS POST DE ' + seccion, 'ERROR');
        }
      }, err => {
        this.listAllSecc = true;
        this.toastr.error('ERROR AL CARGAR LOS POST DE ' + seccion, 'ERROR');
      });
    } else {
      this.listar();
    }
  }

  AgregarSeccion() {
    this.seccionSevice.guardarSeccionesUsingPOST(this.objSeccion).pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
      if (data != null) {
        this.toastr.success('CREADO SATISFACTORIAMENTE', 'HECHO');
        this.listarSecciones('ADMIN');
      } else {
        this.toastr.error('ERRO AL CREAR', 'ERROR');
      }
    }, err => {
      this.toastr.error('ERRO AL CREAR', 'ERROR');
    });
  }

  listarSeccionAdmin() {
    this.postService.findAllBySeccionAdminUsingGET().pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
      if (data.object) {
        this.postDtoOnly = data.object;
      } else {
        this.toastr.error('ERROR AL CARGAR LOS POST DE ESTA SECCION ', 'ERROR');
      }
    }, err => {
      this.toastr.error('ERROR AL CARGAR LOS POST DE ESTA SECCION ', 'ERROR');
    });
  }
}

