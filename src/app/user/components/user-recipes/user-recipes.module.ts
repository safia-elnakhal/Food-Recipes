import { SharedModule } from './../../../shared/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRecipesComponent } from './user-recipes.component';
import { RouterModule, Routes } from '@angular/router';
import { RecipesDetailsComponent } from '../recipes-details/recipes-details.component';


const routes: Routes = [
  { path: '', component: UserRecipesComponent }

]



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations:
    [UserRecipesComponent,
    RecipesDetailsComponent]
})
export class UserRecipesModule {


 }
