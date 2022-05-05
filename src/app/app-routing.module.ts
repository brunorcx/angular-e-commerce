import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ManageProductsComponent } from './features/manage-products/manage-products.component';
import { SuggestedComponent } from './features/suggested/suggested.component';
const routes: Routes = [
  { path: '', redirectTo: '/first-component', pathMatch: 'full' },
  { path: 'first-component', component: SuggestedComponent },
  { path: 'manage-products', component: ManageProductsComponent },
  // { path: '**', component: AppComponent }, // redirect to home page on route error
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
