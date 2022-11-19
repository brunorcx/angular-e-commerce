import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ManageProductsComponent } from './features/manage-products/manage-products.component';
import { SuggestedComponent } from './features/suggested/suggested.component';
import { MallsComponent } from './features/malls/malls.component';
const routes: Routes = [
  { path: '', component: SuggestedComponent },
  { path: 'manage-products', component: ManageProductsComponent },
  { path: 'malls', component: MallsComponent },
  { path: '**', redirectTo: '' }, // redirect to home page on route error
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
