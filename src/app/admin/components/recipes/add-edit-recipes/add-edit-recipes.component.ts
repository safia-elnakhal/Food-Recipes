import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from 'src/app/admin/models/category';
import { ITag } from 'src/app/admin/models/itag';
import { CategoryService } from 'src/app/admin/services/category.service';
import { HelperService } from 'src/app/admin/services/helper.service';
import { RecipesService } from 'src/app/admin/services/recipes.service';
import { IRecipes } from 'src/app/admin/models/irecipes';

@Component({
  selector: 'app-add-edit-recipes',
  templateUrl: './add-edit-recipes.component.html',
  styleUrls: ['./add-edit-recipes.component.scss'],
})
export class AddEditRecipesComponent implements OnInit {
  tags: ITag | any = [];
  categories: ICategory[] | any = [];
  tagId: number = 0;
  categoriesId: number = 0;
  imgSrc: any;
  recipeId: number = 0;

  recipeData: IRecipes[] | any = [];

  ids: number[] = [];
  constructor(
    private _CategoryService: CategoryService,
    private _HelperService: HelperService,
    private _RecipesService: RecipesService,
    private _ToastrService: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
    private router: Router
  ) {
    console.log(_ActivatedRoute.url);
    console.log(_ActivatedRoute.snapshot.params);
    //console.log(_ActivatedRoute.snapshot.params['id']);
    this.recipeId = _ActivatedRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.getAllTags();
    //   this.getAllCategoriesWithoutPagination();
    if (this.recipeId > 0) {
      this.getRecipeById(this.recipeId);
    }
  }

  recipeForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    tagId: new FormControl(null, [Validators.required]),
    recipeImage: new FormControl(null, [Validators.required]),
    categoriesIds: new FormControl(null),
  });

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
  files: File[] = [];
  onSelect(event: any) {
    console.log(event);
    this.imgSrc = event.addedFiles[0];
    console.log(this.imgSrc);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSubmit(data: FormGroup) {
    console.log(data.value);
    data.value.id = this.recipeId;
    let myData = new FormData();
    myData.append('name', data.value.name);
    myData.append('description', data.value.description);
    myData.append('price', data.value.price);
    myData.append('tagId', data.value.tagId);
    myData.append('categoriesIds', data.value.categoriesIds);
    myData.append('recipeImage', this.imgSrc);

    if (this.recipeId) {
      myData.append('id', data.value.id);
      this.editRecipe(myData);
    } else {
      this.addRecipe(myData);
    }
  }
  editRecipe(data: any) {
    data.id = this.recipeId;
    this._RecipesService.onEditRecipe(this.recipeId, data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this._ToastrService.success('Add Successfully');
        this.router.navigate(['/dashboard/admin/recipes']);
      },
    });
  }
  addRecipe(data: any) {
    this._RecipesService.onAddRecipe(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this._ToastrService.success('Add Successfully');
        this.router.navigate(['/dashboard/admin/recipes']);
      },
    });
  }
  getRecipeById(id: number) {
    this._RecipesService.getRecipeById(id).subscribe({
      next: (res: IRecipes) => {
        console.log(res);
        this.recipeData = res;
      },
      error: () => {},
      complete: () => {
        let arr: any[] = [...this.recipeData.category];
        this.ids = arr.map((x) => x.id);
        console.log(this.ids);

        this.recipeForm.patchValue({
          name: this.recipeData.name,
          description: this.recipeData.description,
          price: this.recipeData.price,
          tagId: this.recipeData.tag.id,
          recipeImage: this.recipeData.recipeImage,
          categoriesIds: this.recipeData.category.map((x:any)=>x.id),
        });

        //deep copy ... (speared opreater)or==>   for (const item of this.recipeData.category  ) {
        //   arr.push(item)
        // }
      },
    });
  }
}
