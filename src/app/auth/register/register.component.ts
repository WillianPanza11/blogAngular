import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthControllerService, LoginRequest, RegisterRequest } from 'src/app/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  //registerPayload: RegisterPayload;
  registerPayload: RegisterRequest;

  constructor(private formBuilder: FormBuilder, private authService: AuthControllerService,
     private router:Router) {
    this.registerForm = this.formBuilder.group({
      username: '',
      email: '',
      password: '',
      //confirmPassword: ''
    });
    this.registerPayload = {
      username: '',
      email: '',
      password: '',
      //confirmPassword: ''
    };
   }

  ngOnInit(): void {
  }

  onSubmit() {
    this.registerPayload.username = this.registerForm.get('username')?.value;
    this.registerPayload.email = this.registerForm.get('email')?.value;
    this.registerPayload.password = this.registerForm.get('password')?.value;
    //this.registerPayload.confirmPassword = this.registerForm.get('confirmPassword')?.value;

    this.authService.signupUsingPOST(this.registerPayload).subscribe(data => {
      console.log('register succes');
      this.router.navigateByUrl('/register-success');
    }, error => {
      console.log('register failed');
    });
  }

}
