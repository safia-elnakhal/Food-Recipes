import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../models/category';
import { PageEvent } from '@angular/material/paginator';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  tableData: ICategory[] = [];
  tableResponse: any;
  searchKey: string="";

  //length = 50;
  pageSize = 5;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent | any;

  constructor(
    private _CategoryService: CategoryService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this._CategoryService
      .getAllCategories(this.pageSize, this.pageIndex ,this.searchKey)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.tableResponse = res;

          this.tableData = res.data;
          // this.tableData=this.tableResponse.data
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);

    //this.pageEvent = e;
    // this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = this.tableResponse?.pageNumber;

    this.getCategories();
  }

   openAddCategoryDialog() {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      //  let x = {name:result}
      if (result) {
        this.addCategory(result);
      }
    });
  }

  openEditCategoryDialog(CategoryData: any) {
    console.log(CategoryData);

    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: CategoryData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      //  let x = {name:result}
      if (result) {
        this.editCategory(result);
      }
    });
  }
  
  openDeleteCategoryDialog(CategoryData: any) {
    console.log(CategoryData);

    const dialogRef = this.dialog.open(DeleteComponent, {
      data: CategoryData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      //  let x = {name:result}
      if (result) {
        this.deleteCategory(result);
      }
    });
  }
  addCategory(categoryName: string) {
    this._CategoryService.onAddCategory(categoryName).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Category', ' Added Category Success');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Category', ' Added Category field');
      },
      complete: () => {
        this.getCategories();
      },
    });
  }

  editCategory(categoryItem: any) {
    this._CategoryService.onEditCategory(categoryItem).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Category', ' Updated Category Success');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Category', ' Updated Category field');
      },
      complete: () => {
        this.getCategories();
      },
    });
  }

  deleteCategory(categoryId: any) {
    this._CategoryService.onDeleteCategory(categoryId).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Category', ' deleted Category Success');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Category', ' deleted Category field');
      },
      complete: () => {
        this.getCategories();
      },
    });
  }
}
