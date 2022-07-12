import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interface/User';
import { AuthControllerService, LoginUsuario } from 'src/app/ServiceSwagger';
import { ServiciosTokenService } from 'src/app/servicios/servicios-token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  roles: string[] = [];
  isLogged = false;
  isLoginFail = false;
  nombreUsuario!: string;
  password!: string;
  formGroup!: FormGroup;

  loginUsuario: LoginUsuario = {
    nombreUsuario: '',
    password: ''
  }

  constructor(private authService: AuthControllerService, private router: Router,
    private tokenService: ServiciosTokenService, private toastr: ToastrService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }

    this.formGroup = this.formBuilder.group({
      nombreUser: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      pass: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    });
  }

  onSubmit() {
    this.loginUsuario.nombreUsuario = this.nombreUsuario;
    this.loginUsuario.password = this.password;
    this.authService.loginUsingPOST(this.loginUsuario).subscribe(data => {
      if (data.object != null) {
        this.isLogged = true;
        this.isLoginFail = false;

        this.tokenService.setToken(data.object.token!);
        this.tokenService.setUserName(data.object.nombreUsuario || '');
        this.tokenService.setAuthorities(data.object.authorities as string[]);

        this.roles = data.object.authorities as string[];


        this.toastr.success('INGRESADO CORRECTAMENTE ' + this.loginUsuario.nombreUsuario?.toUpperCase(), 'BIENVENIDO');
        this.authService.findNombreUsingGET(this.loginUsuario.nombreUsuario).subscribe(data => {
          if (data.object != null) {
            this.setLocalStorage(data.object);
            this.router.navigate(['/']);
          }
        });
      } else {
        this.toastr.error('ERROR AL INGRESAR ' + this.loginUsuario.nombreUsuario?.toUpperCase(), 'VERIFIQUE SUS DATOS');
      }

    }, err => {
      this.toastr.error('ERROR AL INGRESAR ' + this.loginUsuario.nombreUsuario?.toUpperCase(), 'VERIFIQUE SUS DATOS');
    }
    );
  }

  setLocalStorage(user: any) {
    const usuario: User = {
      uid: user.idUsuario,
      nombreUsuario: user.nombreUsuario,
      nombre: user.nombre
    }

    localStorage.setItem('user', JSON.stringify(usuario));
  }

}
