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
import { VerifyAcountComponent } from './components/verify-acount/verify-acount.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PopUpResetPasswordComponent } from './components/pop-up-reset-password/pop-up-reset-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [AuthComponent ,LoginComponent ,RegisterComponent, VerifyAcountComponent, ForgetPasswordComponent, ResetPasswordComponent, PopUpResetPasswordComponent, ChangePasswordComponent, ProfileComponent],

  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    HttpClientModule,
    NgxDropzoneModule,
  ],
  
})
export class AuthModule {}
