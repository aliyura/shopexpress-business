import { ManageShopComponent } from './pages/manage-shop/manage-shop.component';
import { VerifyAccountComponent } from './pages/verify-account/verify-account.component';
import { StatusComponent } from './pages/status/status.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { VoucherCardsComponent } from './pages/voucher-cards/voucher-cards.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BusinessesComponent } from './pages/businesses/businesses.component';
import { BuyersComponent } from './pages/buyers/buyers.component';
import { SubCategoriesComponent } from './pages/sub-categories/sub-categories.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductsComponent } from './pages/products/products.component';
import { CitiesComponent } from './pages/cities/cities.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'verify-account',
    component: VerifyAccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'shop',
    component: ManageShopComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/sub-categories/:id',
    component: SubCategoriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/add',
    component: CreateProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/edit/:id',
    component: CreateProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/products',
    component: ProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'voucher/cards',
    component: VoucherCardsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/orders',
    component: OrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/orders/:city',
    component: OrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reviews',
    component: ReviewsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/order/details/:id',
    component: OrderDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'businesses',
    component: BusinessesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'transaction/status/:id',
    component: StatusComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'buyers',
    component: BuyersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'locations',
    component: LocationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order/cities',
    component: CitiesComponent,
    canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload',
    relativeLinkResolution: 'legacy'
}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
