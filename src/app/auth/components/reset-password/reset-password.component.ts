import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  hide: boolean = true;
  confirmhide: boolean = true;
  isLoading: boolean = false;
  
  emailReset = localStorage.getItem('emailReset');
  
  constructor(private _Router:Router,
    private _AuthService: AuthService,
    private toastr: ToastrService,

  ) {}
  ngOnInit() {
  }

  resetPasswordForm = new FormGroup({

    email: new FormControl(this.emailReset, [Validators.required, Validators.email]),
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
 
}

   
