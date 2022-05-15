import { AccountType } from './../../enum/account-type.enum';
import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { List } from 'src/app/types/list.type';
import { Store } from 'src/app/enum/store.enum';
import { LoginToken } from 'src/app/models/login-token';
import { CityOrder } from 'src/app/models/city-order.model';
import { OrderService } from 'src/app/services/order.service';
import { ApiResponse } from 'src/app/models/api-response.model';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  citiesOrderAnalytic: List<CityOrder>;
  appAccountType = AccountType;
  isLoading: boolean = true;

  constructor(
    private authService: AuthenticationService,
    private storage: StorageService,
    private orderService:OrderService
  ) { }

  public getCitiesOrderAnalytic() {
    this.isLoading = true;
    this.orderService.getCityOrdersAnalytic().subscribe(
      (response: ApiResponse) => {
        this.isLoading = false;
        if (response.success) {
          this.citiesOrderAnalytic = response.payload;
        }
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
    this.isLoading = false;
  }


  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }
  get authenticatedUser() {
    return this.authService.authenticatedUser as LoginToken;
  }

  ngOnInit(): void {
    this.getCitiesOrderAnalytic();
  }

}
