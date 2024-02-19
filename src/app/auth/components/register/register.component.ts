import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  ngOnInit() {
  }
  hide: boolean = true;
  confirmhide: boolean = true;
  isLoading: boolean = false;

  constructor(
    private _AuthService: AuthService,
    private toastr: ToastrService
  ) {}


  registerForm = new FormGroup({
    userName : new FormControl(null, [Validators.required,]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    country : new FormControl(null, [Validators.required, ]),
    phoneNumber: new FormControl(null, [Validators.required,
      // Validators.pattern('^(\+201|01|00201)[0-2,5]{1}[0-9]{8}')
    ]),
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
    console.log(data.value);
    this._AuthService.onRegister(data.value).subscribe({
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
        this.toastr.success('Register Successfully', 'Success');
      },
    });
  }


}
