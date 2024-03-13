import { UserRecipesModule } from './components/user-recipes/user-recipes.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { HomeComponent } from '../dashboard/home/home.component';


const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
       { path: '', component: HomeComponent},
      {path: 'recipes',
   
      loadChildren: () =>
        import('../user/components/user-recipes/user-recipes.module').then((m) => m.UserRecipesModule),
    },
   
      {
        path: 'favorites',   loadChildren: () =>
        import('../user/components/favorites/favorites.module').then((m) => m.FavoritesModule),
    
      },


  ]}

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
