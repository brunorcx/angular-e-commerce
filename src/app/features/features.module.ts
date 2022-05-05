import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { SuggestedComponent } from './suggested/suggested.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ManageProductsComponent, SuggestedComponent],
  imports: [CommonModule, MatIconModule],
})
export class FeaturesModule {}
