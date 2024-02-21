import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-verify-acount',
  templateUrl: './verify-acount.component.html',
  styleUrls: ['./verify-acount.component.scss']
})
export class VerifyAcountComponent {
  verifyForm = new FormGroup({
    email: new FormControl(null) ,
    code: new  FormControl(null)
    })
  constructor(public dialogRef: MatDialogRef<VerifyAcountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  ) {
      
    }
    onNoClick(): void {
      this.dialogRef.close();
    }

}
