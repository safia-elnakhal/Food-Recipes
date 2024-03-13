import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from 'src/app/auth/components/change-password/change-password.component';
import { AuthService } from 'src/app/auth/services/auth.service';
 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private _AuthService: AuthService,
    public dialog: MatDialog) {
    
  }
  userName = localStorage.getItem('userName');

  myLogout() {
    this._AuthService.logOut();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      data: { name: '' },
    });

    dialogRef.afterClosed().subscribe(result=> {
       console.log('The dialog was closed' ,result);
      // if (result) {
      //    this.onVerifyAccount(result)
      // } else {
      //    console.log("code incorrect");
      //    this.toastr.error('Account Activated UnSuccessfully', 'failed');
         
      //  }
    });


  }

}
