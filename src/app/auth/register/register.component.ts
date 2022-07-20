import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthControllerService, NuevoUsuario } from 'src/app/ServiceSwagger';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup!: FormGroup;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  nuevoUsuario: NuevoUsuario = {
    email: "",
    nombre: "",
    nombreUsuario: "",
    password: "",
    //roles:[],
  }
  loading = false;

  constructor(private formBuilder: UntypedFormBuilder, private authService: AuthControllerService,
    private router: Router, private toastr: ToastrService) {
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40),  Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]],
      //confirmPassword: ''
    });
  }

  ngOnInit(): void {
  }

  get username() { return this.formGroup.get('username'); }
  get email() { return this.formGroup.get('email'); }
  get password() { return this.formGroup.get('password'); }
  get nombre() { return this.formGroup.get('nombre'); }

  onSubmit() {
    if (this.formGroup.valid) {
      this.authService.nuevoUsingPOST(this.nuevoUsuario).subscribe(data => {
        if (data.object == "CAMPOS MAL FORMADOS!!") {
          this.toastr.error('VERIFIQUE SUS DATOS', 'ERROR');
          return;
        } else if (data.object == "ESE NOMBRE YA EXISTE!!") {
          this.toastr.error('PRUEBE CON OTRO NOMBRE DE USUARIO ', 'NOMBRE DE USUARIO YA EXISTE');
          return;
        } else if (data.object == "ESE EMAIL YA EXISTE!!") {
          this.toastr.error('PRUEBE CON OTRO EMAIL ', 'ESE EMAIL YA EXISTE');
          return;
        } else if (data.object == "USUARIO GUARDADO") {
          this.toastr.success('REGISTRADO CORRECTAMENTE ' + this.nuevoUsuario.nombreUsuario, 'BIENVENIDO');
          this.router.navigateByUrl('/register-success');
          return;
        } else {
          this.toastr.error('ERROR AL REGISTRARSE ', 'ERROR');
          return;
        }
      }, error => {
        this.toastr.error('ERROR AL REGISTRARSE ', 'ERROR');
      })
    }else{
      this.toastr.error('VERIFIQUE SUS DATOS', 'ERROR');
    }
  }

}
