import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../../shared/shared.module';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';
import { AddEditRecipesComponent } from './add-edit-recipes/add-edit-recipes.component';


@NgModule({
  declarations: [
  RecipesComponent,
  AddEditRecipesComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule, 
    SharedModule
  ],
})
export class RecipesModule { }
