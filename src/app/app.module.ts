import { LoaderComponent } from './views/loader/loader.component';
import { AppCluster } from './app.shared.cluster';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTreeModule } from '@angular/material/tree';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatListModule } from '@angular/material/list';
import { ShortNamePipe } from './pipes/short-name.pipe';
import { MatNativeDateModule } from '@angular/material/core';
import { GroupByPipe } from './pipes/group-by.pipe';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { ExcerptPipe } from './pipes/excerpt.pipe';
import { TitleCasePipe } from './pipes/title-case.pipe';
import { TagInputModule } from 'ngx-chips';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe } from '@angular/common';
import { VerifyAccountComponent } from './pages/verify-account/verify-account.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopComponent } from './components/top/top.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { StorageService } from './services/storage.service';
import { Store } from './enum/store.enum';
import { BuyersComponent } from './pages/buyers/buyers.component';
import { BusinessesComponent } from './pages/businesses/businesses.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { PaginationComponent } from './views/pagination/pagination.component';
import { SubCategoriesComponent } from './pages/sub-categories/sub-categories.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { AddCategoryModalDialog } from './components/dialogs/add-category/add-category.component';
import { ToastrModule } from 'ngx-toastr';
import { AddSubCategoryModalDialog } from './components/dialogs/add-sub-category/add-sub-category.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductsComponent } from './pages/products/products.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { VoucherCardsComponent } from './pages/voucher-cards/voucher-cards.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { StatusComponent } from './pages/status/status.component';
import { ManageShopComponent } from './pages/manage-shop/manage-shop.component';
import { AddShopComponent } from './components/dialogs/add-shop/add-shop.component';
import { CitiesComponent } from './pages/cities/cities.component';


export function tokenGetter() {
  return new StorageService().get(Store.TOKEN);
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    VerifyAccountComponent,
    DashboardComponent,
    SidebarComponent,
    TopComponent,
    BuyersComponent,
    BusinessesComponent,
    CategoriesComponent,
    PaginationComponent,
    SubCategoriesComponent,
    CreateProductComponent,
    AddCategoryModalDialog,
    AddSubCategoryModalDialog,
    ProfileComponent,
    ProductsComponent,
    LocationsComponent,
    VoucherCardsComponent,
    OrdersComponent,
    OrderDetailsComponent,
    ReviewsComponent,
    StatusComponent,
    LoaderComponent,
    ManageShopComponent,
    AddShopComponent,
    CitiesComponent,
  ],
  imports: [
    TagInputModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCheckboxModule,
    MatListModule,
    MatDividerModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatStepperModule,
    MatChipsModule,
    MatTreeModule,
    MatExpansionModule,
    MatRadioModule,
    MatGridListModule,
    MatCardModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [
          '/business/login',
          '/business/signup',
          '/business/verify-account',
        ],
      },
    }),
  ],
  providers: [
    Title,
    AsyncPipe,
    ExcerptPipe,
    AppCluster,
    JwtHelperService,
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: true },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
