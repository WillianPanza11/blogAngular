import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterSuccessComponent } from './auth/register-success/register-success.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { HogarComponent } from './hogar/hogar.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PostComponent } from './post/post.component';
import {CargarScriptsService} from './cargar-scripts.service';
import { SpinnerComponent } from './spinner/spinner.component'
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthControllerService, PostControllerService, SeccionesControllerService } from './ServiceSwagger';
import { interceptorProvider } from './interceptor/interceptor.service';
import {GuardsPostService} from './Guards/guards-post.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    RegisterSuccessComponent,
    HogarComponent,
    AddPostComponent,
    PostComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: HogarComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'post/:id', component: PostComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register-success', component: RegisterSuccessComponent},
      {path: 'home', component: HogarComponent},
      {path: 'add-post', component: AddPostComponent, canActivate:[GuardsPostService], data: {expectedRol:['admin', 'user']}},
    ]),
    HttpClientModule,
    EditorModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthControllerService,
    PostControllerService,
    CargarScriptsService,
    interceptorProvider,
    SeccionesControllerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
