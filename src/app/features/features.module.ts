import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { SuggestedComponent } from './suggested/suggested.component';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [ManageProductsComponent, SuggestedComponent, SidebarComponent],
  imports: [CommonModule, MatIconModule],
})
export class FeaturesModule {}
