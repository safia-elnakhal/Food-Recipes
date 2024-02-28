import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

interface Menu{
  text: string;
  link: string;
  icon: string;
  isActive: boolean;

}


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor( private _AuthService:AuthService) {
    
  }

  isAdmin(): boolean {
   return this._AuthService.role == 'SuperAdmin' ? true : false;
    
  }
  isUser(): boolean {
    return this._AuthService.role == 'SystemUser' ? true : false;
     
   }


  Menu: Menu[] = [
    {
    
    text: 'Home',
    link: '/dashboard/home',
    icon: 'fa-solid fa-house',
    isActive: this.isAdmin() || this.isUser() ,
    },
    {
    
      text: 'Users',
      link: 'users',
      icon: 'fa-solid fa-users',
      isActive: this.isAdmin()  ,
    },
    {
    
      text: 'Recipes',
      link: 'Recipes',
      icon: 'fa-solid fa-users',
      isActive: this.isAdmin()  ,
    },
    {
    
      text: 'Categories',
      link: 'Categories',
      icon: 'fa-regular fa-calendar-days',
      isActive: this.isAdmin()  ,
    },
    {
    
      text: 'Favorite',
      link: 'Categories',
      icon: 'fa-regular fa-calendar-days',
      isActive: this.isUser()  ,
    },
    {
    
      text: 'UserRecipes',
      link: 'Categories',
      icon: 'fa-regular fa-calendar-days',
      isActive: this.isUser()  ,
    }
    
  ]

}
