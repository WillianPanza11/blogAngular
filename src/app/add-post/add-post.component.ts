import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HogarComponent } from '../hogar/hogar.component';
import { User } from '../interface/User';
import { PostControllerService, PostDto, SeccionesDto } from '../ServiceSwagger';
import { ServiciosTokenService } from '../servicios/servicios-token.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  providers: [HogarComponent]
})
export class AddPostComponent implements OnInit {

  addPostForm!: FormGroup;
  submitted: boolean = false;
  // title = new FormControl('');
  // body = new FormControl('');
  shwMessGood: boolean = false;
  shwMessErr = false;

  isLogged = false;
  isAdmin = false;
  esAdmin = '';
  rol: any = [];
  postDto: PostDto = {
    content: "",
    createdOn: new Date(),
    iduser: 0,
    title: "",
    updatedOn: new Date(),
    username: "",
    idSecciones: 0
  }

  secciones?: SeccionesDto[] = [];
  opcionSeleccionado: string = 'TODO';
  verSeleccion: string = '';

  objSeccion: SeccionesDto = {
    //idSecciones: 0,
    nombre: '',
  }

  constructor(private addpostService: PostControllerService, private router: Router,
    private toastr: ToastrService, private formBuilder: UntypedFormBuilder,
    private tokenService: ServiciosTokenService, public hogar: HogarComponent) {
    // this.addPostForm = this.formBuilder.group({
    //   title: this.title,
    //   body: this.body
    // });
  }

  ngOnInit() {
    this.isLogged = this.tokenService.isLogged();
    //this.isAdmin = this.tokenService.isAdmin();

    this.rol = JSON.parse(sessionStorage.getItem('AuthAuthorities')!);
    this.rol.forEach((element: { authority: string; }) => {
      if (element.authority == 'ROLE_ADMIN') {
        this.esAdmin = 'ADMIN';
      } else {
        this.esAdmin = ''
      }
    });

    this.cargarSecciones();

    this.addPostForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      body: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  get title() { return this.addPostForm.get('title'); }
  get body() { return this.addPostForm.get('body'); }

  addPost() {
    const usuario: User = JSON.parse(localStorage.getItem('user')!);
    this.postDto.iduser = usuario.uid;
    this.postDto.username = usuario.nombre;
    this.postDto.idSecciones = +this.SelectSeleccionado();
    this.submitted = true;
    if (this.SelectSeleccionado() != "TODO") {
      if (this.addPostForm.valid) {
        this.addpostService.guardarMenuUsingPOST(this.postDto).subscribe(data => {
          if (data) {
            this.router.navigateByUrl('/');
            this.toastr.success('Tu post esta creado satisfactoriamente', 'Verifica');
          }
        }, error => {
          this.toastr.error('SUCEDIÓ UN ERROR', 'ERROR');
          console.log('Failure Response' + error.message);
        })
      } else {
        this.toastr.error("LLENE TODOS LOS CAMPOS REQUERIDOS");
      }
    } else {
      this.toastr.error("NO PUEDES PUBLICAR EN TODO, SELECCIONA UNA SECCION");
    }
  }

  messErro() {
    this.shwMessErr = true;
    setTimeout(() => {
      this.shwMessErr = false;
    }, 3000);
  }

  messGood() {
    this.shwMessGood = true;
    setTimeout(() => {
      this.shwMessGood = false;
    }, 3000);
  }


  cargarSecciones() {
    this.hogar.listarSecciones(this.esAdmin);
  }

  SelectSeleccionado() {
    this.verSeleccion = this.hogar.opcionSeleccionado;
    this.hogar.listarPostBySeccion(this.verSeleccion);
    return this.verSeleccion;
  }

}
