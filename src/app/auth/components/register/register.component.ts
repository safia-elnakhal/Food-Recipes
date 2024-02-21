import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { VerifyAcountComponent } from '../verify-acount/verify-acount.component';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 
  hide: boolean = true;
  confirmhide: boolean = true;
  isLoading: boolean = false;
  imgSrc: any;

  constructor(private _Router:Router,
    private _AuthService: AuthService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
  }

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
    myData.append('profileImage', this.imgSrc);

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
    this.imgSrc=event.addedFiles[0];
    console.log(this.imgSrc)
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }


  openDialog() {
    const dialogRef = this.dialog.open(VerifyAcountComponent, {
      data: { name: '' },
    });

    dialogRef.afterClosed().subscribe(result=> {
      console.log('The dialog was closed' ,result);
      if (result) {
         this.onVerifyAccount(result)
      } else {
         console.log("code incorrect");
         this.toastr.success('Account Activated UnSuccessfully', 'failed');
         
       }
    });


  }

  onVerifyAccount(data: any) {
    this._AuthService.onVerify(data).subscribe({
      next: (res) => {
        console.log(res);
        
      }, error: (err) => {
        
      }, complete: () => {
        this.toastr.success('Account Activated Successfully', 'Success');
        this._Router.navigate(['auth/login'])
      }
    }

    )
    
  }
}
