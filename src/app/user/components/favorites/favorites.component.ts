import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IRecipes } from 'src/app/admin/models/irecipes';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  tableData: any;
  tableRecipe: IRecipes[] | any = [];

  imagePath: string = 'https://upskilling-egypt.com/';
  dummyImage: string = '../../../../assets/images/defult-recipes.jpg';

  constructor(private _UserService: UserService,private _toastr:ToastrService) {}

  ngOnInit() {
    this.getMyFavs();
  }

  getMyFavs() {
    this._UserService.getFavs().subscribe({
      next: (res) => {
        console.log(res);
        this.tableRecipe = res.data;
      },
    });
  }
  //erorr =>don't add Favs
  removeItem(id: number) {
    this._UserService.onRemoveFav(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
        this._toastr.error('Deleted Favorite Recipe Failed');
      },
      complete: () => {
        this._toastr.success('Deleted Successfully');
        this.getMyFavs();
      },
    });
  }
}
