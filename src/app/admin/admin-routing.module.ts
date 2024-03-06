import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategoriesComponent } from './components/categories/categories.component';

const routes: Routes = [{
  path: '', component: AdminComponent, children: [
    {
      path: 'recipes',
   
      loadChildren: () =>
        import('../admin/components/recipes/recipes.module').then((m) => m.RecipesModule),
    },
   
    {path:'category', component:CategoriesComponent},
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
