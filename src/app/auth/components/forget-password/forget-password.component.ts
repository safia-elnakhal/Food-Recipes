import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopUpResetPasswordComponent } from '../pop-up-reset-password/pop-up-reset-password.component';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  isLoading: boolean = false;


  constructor(
    private _AuthService: AuthService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private _Router: Router,

  ) { }

 

  forgetPassword = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
 
  });

  onSubmit(data: FormGroup) {
    this.isLoading = true;
    console.log(data.value);
    this._AuthService.onForgetPassword(data.value).subscribe({
      next: (res) => {
        console.log(res);
          this._Router.navigate(['auth/reset-password'])
   
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err.error.message);
        this.toastr.error(err.error.message, 'Error');

      },
      complete: () => {
        this.isLoading = false;
       
      },
    });
  }

  // openDialog() {
  //   if (this.forgetPassword.valid) {
  //     const dialogRef = this.dialog.open(PopUpResetPasswordComponent, {
  //       data: { email: this.forgetPassword.value},
  //     });
  //   } else {
  //     this.toastr.error('Please enter a valid email address', 'Error');
  //   }
  // }
}
