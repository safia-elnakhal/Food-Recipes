import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/admin/models/category';
import { ITag } from 'src/app/admin/models/itag';
import { CategoryService } from 'src/app/admin/services/category.service';
import { HelperService } from 'src/app/admin/services/helper.service';

@Component({
  selector: 'app-add-edit-recipes',
  templateUrl: './add-edit-recipes.component.html',
  styleUrls: ['./add-edit-recipes.component.scss']
})
export class AddEditRecipesComponent implements OnInit {
  tags: ITag[] |any = [];
  categories: ICategory[] | any = [];
  tagId: number = 0;
  categoriesId: number = 0;

  constructor(private _CategoryService: CategoryService,
    private _HelperService: HelperService,
    ){}
  ngOnInit():void {
    this.getAllTags();
 //   this.getAllCategoriesWithoutPagination();
  }

  recipeForm = new FormGroup({
    name:new FormControl(null,[Validators.required]),
    description : new FormControl(null, [Validators.required]),
    price : new FormControl(null, [Validators.required]),
    tagId : new FormControl(null, [Validators.required]),
    recipeImage : new FormControl(null, [Validators.required]),
    categoriesIds: new FormControl(null),

  
  })

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
