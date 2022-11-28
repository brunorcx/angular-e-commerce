import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MallsComponent } from './malls/malls.component';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [HomeComponent, ProductsComponent, SidebarComponent, MallsComponent],
  imports: [CommonModule, MatIconModule, MdbDropdownModule, AppRoutingModule],
})
export class FeaturesModule {}
