import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatDialogModule} from '@angular/material/dialog';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DeleteComponent } from './delete/delete.component';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule,
    FormsModule
  ]
  , exports: [
    ReactiveFormsModule,
    MatDialogModule,
    SidebarComponent,
    NavbarComponent,
    DeleteComponent,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatPaginatorModule,
    FormsModule
  ]
})
export class SharedModule { }
