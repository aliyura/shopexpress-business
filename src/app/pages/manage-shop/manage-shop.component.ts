import { DialogHandlerService } from './../../services/dialog-handler.service';
import { Shop } from './../../models/shop.model';
import { ShopService } from './../../services/shop.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { ApiResponse } from 'src/app/models/api-response.model';

@Component({
  selector: 'app-manage-shop',
  templateUrl: './manage-shop.component.html',
  styleUrls: ['./manage-shop.component.css'],
})
export class ManageShopComponent implements OnInit {
  isLoading: boolean = true;
  shop: Shop;

  constructor(
    private auth: AuthenticationService,
    private shopService: ShopService,
    private dialogHandler: DialogHandlerService,
    private notificationService:NotificationService
  ) {}

  addShop() {
    this.dialogHandler.requestAddShopDialog('Create Shop', (response) => {
      if (response) {
        this.notificationService.notifySuccess('Shop Created Successfully');
        this.getShop();
      } else {
        this.notificationService.notifyError('Unable to create shop');
      }
    });
  }

  editShop() {}

  getShop() {
    this.isLoading = true;
    this.shopService
      .getShopByVendorId(this.auth.authenticatedUser.id)
      .subscribe(
        (response: ApiResponse) => {
          this.isLoading = false;
          if (response.success) {
            this.shop = response.payload;
            console.log(this.shop);
          }
        },
        (err) => {
          this.isLoading = false;
          console.log(err);
        }
      );
  }

  ngOnInit(): void {
    this.getShop();
  }
}
