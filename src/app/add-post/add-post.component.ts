import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../interface/User';
import { PostControllerService, PostDto } from '../ServiceSwagger';
import { ServiciosTokenService } from '../servicios/servicios-token.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPostForm: FormGroup;
  //postPayload: PostDto;
  title = new FormControl('');
  body = new FormControl('');
  shwMessGood: boolean = false;
  shwMessErr = false;

  isLogged = false;
  isAdmin = false;

  postDto: PostDto = {
    content: "",
    createdOn: new Date(),
    iduser: 0,
    title: "",
    updatedOn: new Date(),
    username: "",
  }

  constructor(private addpostService: PostControllerService, private router: Router,
    private toastr: ToastrService, private formBuilder: UntypedFormBuilder,
    private tokenService: ServiciosTokenService) {
    this.addPostForm = this.formBuilder.group({
      title: this.title,
      body: this.body
    });
  }

  ngOnInit() {
    this.isLogged = this.tokenService.isLogged();
    //this.isAdmin = this.tokenService.isAdmin();
  }

  addPost() {
    const usuario: User = JSON.parse(localStorage.getItem('user')!);
    this.postDto.iduser = usuario.uid;
    this.postDto.username = usuario.nombre;
    this.addpostService.guardarMenuUsingPOST(this.postDto).subscribe(data => {
      if (data) {
        this.router.navigateByUrl('/');
        this.toastr.success('Tu post esta creado satisfactoriamente', 'Verifica');
      }
    }, error => {
      this.toastr.error('SUCEDIÓ UN ERROR', 'ERROR');
      console.log('Failure Response'+error.message);
    })
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

}
