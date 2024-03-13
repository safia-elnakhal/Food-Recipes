import { RecipesDetailsComponent } from './../recipes-details/recipes-details.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from 'src/app/admin/models/category';
import { IRecipes } from 'src/app/admin/models/irecipes';
import { ITag } from 'src/app/admin/models/itag';
import { CategoryService } from 'src/app/admin/services/category.service';
import { HelperService } from 'src/app/admin/services/helper.service';
import { RecipesService } from 'src/app/admin/services/recipes.service';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.css']
})
export class UserRecipesComponent implements OnInit {


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
    private _UserService:UserService,
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



  openDeleteRecipeDialog(RecipeData: any) {
    console.log(RecipeData);

    const dialogRef = this.dialog.open(DeleteComponent, {
      data: RecipeData,
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
 

  deleteCategory(RecipeId: any) {
    this._RecipesService.onDeleteRecipes(RecipeId).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Recipe', ' deleted Recipe Success');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Recipe', ' deleted Recipe field');
      },
      complete: () => {
        this.getRecipes();
      },
    });
  }

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

  
  openRecipeDetails(item:any) {
    const dialogRef = this.dialog.open(RecipesDetailsComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      //  let x = {name:result}
      if (result) {
        // this.deleteCategory(result);
      }
    });
  }
  onAddFav(id: number) {
    this._UserService.onAddFav(id).subscribe({
      next: (res) => {
        console.log(res);
        
      }, error: (err: any) => {
        console.log(err);
        this.toastr.error('Deleted Favorite Recipe');
        
      }, complete: () => {
        this.toastr.success('Add Favorite Recipe', ' Add Favorite Recipe Success');
      }
    })
  }

}
