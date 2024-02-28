import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {MatDialogModule} from '@angular/material/dialog';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule
  ]
  , exports: [
    ReactiveFormsModule,
    MatDialogModule,
    SidebarComponent,
    NavbarComponent,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class SharedModule { }
