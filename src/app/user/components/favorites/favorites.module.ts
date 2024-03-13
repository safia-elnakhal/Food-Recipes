import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { Routes, RouterModule } from '@angular/router';
import { UserRecipesComponent } from '../user-recipes/user-recipes.component';

const routes: Routes = [
  { path: '', component: FavoritesComponent }

]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FavoritesComponent]
})
export class FavoritesModule { }
