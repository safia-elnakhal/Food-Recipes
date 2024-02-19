import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide: boolean = true;
  isLoading: boolean = false;

  constructor(
    private _AuthService: AuthService,
    private toastr: ToastrService
  ) {}

  // togglePassword() {
  //   this.hide = !this.hide;
  //   // console.log(this.hide);
  //   // if (this.hide == true) {
  //   //   this.hide = false;

  //   // }
  //   // else {
  //   //   this.hide = true;

  //   // }
  // }

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [ Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$'
      ),
    ]),
  });

  onSubmit(data: FormGroup) {
    this.isLoading = true;
    console.log(data.value);
    this._AuthService.onLogin(data.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err.error.message);
        this.toastr.error(err.error.message, 'Error');
      },
      complete: () => {
        this.isLoading = false;
        this.toastr.success('LoggedIn', 'Success');
      },
    });
  }
}