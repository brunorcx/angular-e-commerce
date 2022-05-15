import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { SuggestedComponent } from './suggested/suggested.component';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MallsComponent } from './malls/malls.component';

@NgModule({
  declarations: [ManageProductsComponent, SuggestedComponent, SidebarComponent, MallsComponent],
  imports: [CommonModule, MatIconModule],
})
export class FeaturesModule {}
