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

    let myData = new FormData();
    myData.append('userName', data.value.userName);
    myData.append('email', data.value.email);
    myData.append('country', data.value.country);
    myData.append('phoneNumber', data.value.phoneNumber);
    myData.append('password', data.value.password);
    myData.append('confirmPassword', data.value.confirmPassword);


    console.log(myData.get('userName'));
    console.log(data.value);
    this._AuthService.onRegister(myData).subscribe({
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
  files: File[] = [];

  onSelect(event:any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}
