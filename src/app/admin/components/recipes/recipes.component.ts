import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { ICategory } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
import { RecipesService } from '../../services/recipes.service';
import { IRecipes } from '../../models/irecipes';
import { HelperService } from '../../services/helper.service';
import { ITag } from '../../models/itag';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent {

  tableData: IRecipes[] = [];

  tags: ITag[] |any = [];
  categories: ICategory[] | any = [];
  tagId: number = 0;
  categoriesIds: number = 0;

  
  tableResponse: any;
  searchKey: string = '';

  imagePath: string = 'https://upskilling-egypt.com/';
  dummyImage: string = '../../../../assets/images/defult-recipes.jpg';
  //length = 50;
  pageSize = 5;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent | any;

  constructor(
    private _CategoryService: CategoryService,
    private _HelperService: HelperService,
    private _RecipesService: RecipesService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
 
    this.getAllTags();
  //  this.getAllCategoriesWithoutPagination();
    this.getRecipes();

  }
  test() {
    console.log(this.tagId);
    
  }
  getRecipes() {
    let paramsApi = {
      pageSize: this.pageSize,
      pageNamber: this.pageIndex,
      name: this.searchKey,
      tagId: this.tagId > 0 ? this.tagId : null,
      categoriesIds:this.categoriesIds,
    };
    this._RecipesService.getAllRecipes(paramsApi).subscribe({
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

    this.getRecipes();
  }

  //  openAddCategoryDialog() {
  //   const dialogRef = this.dialog.open(AddEditCategoryComponent, {});

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('The dialog was closed');
  //     console.log(result);
  //     //  let x = {name:result}
  //     if (result) {
  //       this.addCategory(result);
  //     }
  //   });
  // }

  // openEditCategoryDialog(CategoryData: any) {
  //   console.log(CategoryData);

  //   const dialogRef = this.dialog.open(AddEditCategoryComponent, {
  //     data: CategoryData,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('The dialog was closed');
  //     console.log(result);
  //     //  let x = {name:result}
  //     if (result) {
  //       this.editCategory(result);
  //     }
  //   });
  // }

  // openDeleteCategoryDialog(CategoryData: any) {
  //   console.log(CategoryData);

  //   const dialogRef = this.dialog.open(DeleteComponent, {
  //     data: CategoryData,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('The dialog was closed');
  //     console.log(result);
  //     //  let x = {name:result}
  //     if (result) {
  //       this.deleteCategory(result);
  //     }
  //   });
  // }
  // addCategory(categoryName: string) {
  //   this._RecipesService.onAddCategory(categoryName).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.toastr.success('Category', ' Added Category Success');
  //     },
  //     error: (err) => {
  //       console.log(err);
  //       this.toastr.error('Category', ' Added Category field');
  //     },
  //     complete: () => {
  //       this.getCategories();
  //     },
  //   });
  // }

  // editCategory(categoryItem: any) {
  //   this._RecipesService.onEditCategory(categoryItem).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.toastr.success('Category', ' Updated Category Success');
  //     },
  //     error: (err) => {
  //       console.log(err);
  //       this.toastr.error('Category', ' Updated Category field');
  //     },
  //     complete: () => {
  //       this.getCategories();
  //     },
  //   });
  // }

  // deleteCategory(categoryId: any) {
  //   this._RecipesService.onDeleteCategory(categoryId).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.toastr.success('Category', ' deleted Category Success');
  //     },
  //     error: (err) => {
  //       console.log(err);
  //       this.toastr.error('Category', ' deleted Category field');
  //     },
  //     complete: () => {
  //       this.getCategories();
  //     },
  //   });
  // }

  getAllTags() {
    this._HelperService.getTags().subscribe({
      next: (res) => {
        console.log(res);
        this.tags = res;
      },
    });
  }
  getAllCategoriesWithoutPagination() {
    this._CategoryService.getAllCategoriesWithoutPagination().subscribe({
      next: (res) => {
        console.log(res);
        this.categories = res;
      },
    });
  }
}
