import { Router } from '@angular/router';
import { AccountType } from './enum/account-type.enum';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LocationService } from './services/location.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AppCluster } from './app.shared.cluster';
import { CategoryType } from './enum/category-type.enum';
import { Store } from './enum/store.enum';
import { ApiResponse } from './models/api-response.model';
import { CategoryService } from './services/category.service';
import { CounterService } from './services/counter.service';
import { StorageService } from './services/storage.service';
import { User } from './models/user.model';
import { LoginToken } from './models/login-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Lenos Nigeria';

  constructor(
    private app: AppCluster,
    private router:Router,
    private storage: StorageService,
    private authService: AuthenticationService,
    private categoryService: CategoryService,
    private counterService: CounterService,
    private locationService: LocationService
  ) {}

  async getProductCategories() {
    this.categoryService.getCategoriesByType(CategoryType.PRODUCT).subscribe(
      (response: ApiResponse) => {
        if (response.success) {
          if (response.payload != null)
            this.storage.saveSession(
              Store.CATEGORY,
              JSON.stringify(response.payload)
            );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  async getLocations() {
    this.locationService.getLocations().subscribe(
      (response: ApiResponse) => {
        if (response.success) {
          if (response.payload != null)
            this.storage.saveSession(
              Store.LOCATIONS,
              JSON.stringify(response.payload)
            );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async getCounts() {
    this.counterService.getCounts().subscribe(
      (response: ApiResponse) => {
        if (response.success) {
          if (response.payload != null)
            this.storage.saveSession(
              Store.COUNTS,
              JSON.stringify(response.payload)
            );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  async getSellerCounts() {
    this.counterService.getSellerCounts().subscribe(
      (response: ApiResponse) => {
        if (response.success) {
          if (response.payload != null)
            this.storage.saveSession(
              Store.COUNTS,
              JSON.stringify(response.payload)
            );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }
  get authenticatedUser() {
    return this.authService.authenticatedUser as LoginToken;
  }

  ngOnInit(): void {
    this.app.loadJsFile('assets/js/main.js');
    //get product categories
    var categories = this.storage.getSession(Store.CATEGORY);
    if (categories == null) this.getProductCategories();

    //get all locations
    var locations = this.storage.getSession(Store.LOCATIONS);
    if (locations == null) this.getLocations();

    //get all counts
    var counts = this.storage.getSession(Store.COUNTS);
    if (counts == null) {
      if (this.isAuthenticated)
        if (this!.authenticatedUser!.accountType == AccountType.ADMIN)
          this.getCounts();
        else this.getSellerCounts();
    }

  }
}
