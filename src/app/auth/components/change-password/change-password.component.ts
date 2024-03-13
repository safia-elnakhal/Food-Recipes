import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VerifyAcountComponent } from '../verify-acount/verify-acount.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  hide: boolean = true;
  confirmhide: boolean = true;
  hideOld: boolean = true;
  isLoading: boolean = false;
  
  constructor(public dialogRef: MatDialogRef<VerifyAcountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { email: string }
    ,public _Router:Router,
    private _AuthService: AuthService,
    private toastr: ToastrService,) { }

    ChangePasswordForm = new FormGroup({

      oldPassword: new FormControl(null, [Validators.required
      ,Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$'
      ),]),
      newPassword: new FormControl(null, [Validators.required,
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$'
        ),]),
      confirmNewPassword: new FormControl(null, [ Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$'
      ),
    ]),
   
 

  });
  onSubmit(data: FormGroup) {
    this.isLoading = true;
    console.log(data)
    this._AuthService.onChangePassword(data.value).subscribe({
      next: (res) => {
        console.log(res);
        this._Router.navigate(['auth/login']);
     
      },error:(err)=>{
        console.log(err);
        this.toastr.error(err.error.message, 'Error');
      },complete:()=>{
        this.toastr.success('change Password Successfully', 'Success');
      }
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
 
}
