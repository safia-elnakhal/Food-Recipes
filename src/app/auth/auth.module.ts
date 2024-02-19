import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './components/register/register.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [AuthComponent ,LoginComponent ,RegisterComponent],

  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    NgxDropzoneModule
  ],
  
})
export class AuthModule {}
