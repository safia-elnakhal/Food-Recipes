import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.scss']
})
export class RecipesDetailsComponent {
  
  imagePath: string = 'https://upskilling-egypt.com/';
  dummyImage: string = '../../../../assets/images/defult-recipes.jpg';
  constructor(
    public dialogRef: MatDialogRef<RecipesDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log(data);
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
