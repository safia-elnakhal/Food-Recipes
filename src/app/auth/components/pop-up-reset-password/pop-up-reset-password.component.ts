import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { VerifyAcountComponent } from '../verify-acount/verify-acount.component';

@Component({
  selector: 'app-pop-up-reset-password',
  templateUrl: './pop-up-reset-password.component.html',
  styleUrls: ['./pop-up-reset-password.component.scss']
})
export class PopUpResetPasswordComponent {

  hide: boolean = true;
  confirmhide: boolean = true;
  isLoading: boolean = false;
  
  constructor(public dialogRef: MatDialogRef<VerifyAcountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { email: string }
    ,public _Router:Router,
    private _AuthService: AuthService,
    private toastr: ToastrService,) { }

  resetPasswordForm = new FormGroup({

    email: new FormControl(null, [Validators.required, Validators.email]),
    seed: new FormControl(null,[Validators.required]),
    password: new FormControl(null, [ Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$'
      ),
    ]),
    confirmPassword: new FormControl(null, [ Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$'
      ),
    ]), 

  });
  onSubmit(data: FormGroup) {
    this.isLoading = true;
    console.log(data)
    this._AuthService.onResetPassword(data.value).subscribe({
      next: (res) => {
        console.log(res);
        this._Router.navigate(['auth/login']);
     
      },error:(err)=>{
        console.log(err);
        this.toastr.error(err.error.message, 'Error');
      },complete:()=>{
        this.toastr.success('Reset Password Successfully', 'Success');
      }
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

 // seed incorrect  ??    //send email in input   ??
}
