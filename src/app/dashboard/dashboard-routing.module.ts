import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../gaurds/auth.guard';
import { AdminGuard } from '../gaurds/admin.guard';
import { UserGuard } from '../gaurds/user.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path: '', component: DashboardComponent, children: [
    
    {      path: '', component: HomeComponent},
    { 

      path: 'home', component: HomeComponent
  
    },
    {
      path: 'admin',
      canActivate: [AdminGuard],
      loadChildren: () =>
        import('../admin/admin.module').then((m) => m.AdminModule),
    },
    {
      path: 'user', canActivate: [UserGuard],
      loadChildren: () => import('../user/user.module').then((m) => m.UserModule),
    },


  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
