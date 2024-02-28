import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../models/category';
 
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{
  
  tableData: ICategory[] = [];
  
  constructor(private _CategoryService: CategoryService) {
   
  }
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this._CategoryService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.tableData=res.data
      }, error: (err) => {
        console.log(err);
        
        
      }
    })

  }
}
