import { AccountType } from './../../enum/account-type.enum';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Status } from 'src/app/enum/status.enum';
import { OrderService } from './../../services/order.service';
import { Order } from './../../models/order.model';
import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/types/list.type';
import { DialogHandlerService } from 'src/app/services/dialog-handler.service';
import { ApiResponse } from 'src/app/models/api-response.model';
import { User } from 'src/app/models/user.model';
import { LoginToken } from 'src/app/models/login-token';
import { AppCluster } from 'src/app/app.shared.cluster';
import { LocationService } from 'src/app/services/location.service';
import { Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: List<Order>;
  currentPage: number = 0;
  totalPages: number = 0;
  appAccountType = AccountType;
  statusActions: Array<string> = ['IA', 'PV', 'PC', 'OC', 'DP', 'PP', 'DV', "RJ"];
  isLoading: boolean = true;
  location: Location = null;

  constructor(
    private app: AppCluster,
    private authService: AuthenticationService,
    private dialogHandler: DialogHandlerService,
    private orderService: OrderService,
    private locationService: LocationService
  ) { }

  private getOrders(page: number) {
    this.isLoading = true;
    this.currentPage = page;
    this.orderService.getOrders(page).subscribe(
      (response: ApiResponse) => {
        this.isLoading = false;
        if (response.success) {
          this.orders = response.payload['content'];
          this.totalPages = response.payload['totalPages'];
        }
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  private getOrdersByCity(page: number, city) {
    this.isLoading = true;
    this.currentPage = page;
    this.orderService.getOrdersByCity(page, city).subscribe(
      (response: ApiResponse) => {
        this.isLoading = false;
        if (response.success) {
          this.orders = response.payload['content'];
          this.totalPages = response.payload['totalPages'];
        }
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }
  private getOrdersBySeller(selerId: number) {
    this.isLoading = true;
    this.orderService.getOrdersBySellerId(selerId).subscribe(
      (response: ApiResponse) => {
        this.isLoading = false;
        if (response.success) {
          this.orders = response.payload;
        }
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }
  private getLocationByCityCode(cityCode) {
    this.locationService.getLocationByCode(cityCode).subscribe(
      (response: ApiResponse) => {
        this.isLoading = false;
        if (response.success) {
          this.location = response.payload;
        }
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  deleteOrder(order: Order) {
    this.dialogHandler.requestConfirmation(
      'Delete User',
      'Are you sure you want to delete this order?',
      (yes) => {
        if (yes) {
          this.orderService.deleteOrderById(order.id).subscribe(
            (response: ApiResponse) => {
              if (response.success) this.getOrders(this.currentPage);
            },
            (err) => console.log(err)
          );
        }
      }
    );
  }

  changeOrderStatus(e, order: Order) {
    var status = e.target.value;
    order.status = status;
    this.orderService.updateOrderStatus(status, order.id).subscribe(
      (response: ApiResponse) => {
        if (!response.success) this.getOrders(this.currentPage);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  changePage(self, index) {
    self.currentPage = index;
    var cityCode = self.app.getURLParameter(location.href);
    if (cityCode !== 'orders') {
      self.getOrdersByCity(self.currentPage, cityCode);
      self.getLocationByCityCode(cityCode);
    } else {
      self.getOrders(self.currentPage);
    }
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }
  get authenticatedUser() {
    return this.authService.authenticatedUser as LoginToken;
  }

  ngOnInit(): void {

    var cityCode = this.app.getURLParameter(location.href);
    if (cityCode !== 'orders') {
      this.getOrdersByCity(0, cityCode);
      this.getLocationByCityCode(cityCode);
    } else {
      if (this.authenticatedUser.accountType === AccountType.ADMIN) {
        this.getOrders(0);
      } else {
        this.getOrdersBySeller(this.authenticatedUser.id);
      }
    }
  }
}
