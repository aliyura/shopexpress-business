import { AuthenticationService } from './../../../services/authentication.service';
import { ShopService } from './../../../services/shop.service';
import { ShopRequest } from './../../../models/shop-request.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormValidator } from 'src/app/validators/form-custom.validator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { ApiResponse } from 'src/app/models/api-response.model';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.css'],
})
export class AddShopComponent implements OnInit {
  title: any;
  callback: any;
  form: FormValidator;
  shopRequest: ShopRequest;

  constructor(
    public auth: AuthenticationService,
    private notification: NotificationService,
    private shopService: ShopService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddShopComponent>
  ) {
    this.title = data.title;
    this.callback = data.callback;
    this.form = new FormValidator(ShopRequest, 'form');
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getFormatedShopName(value) {
    return value.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
  }

  validateInput(e) {
    var input = e.target.value;
    e.target.value = this.getFormatedShopName(input);
  }
  addShop() {
    this.form.revalidate();
    let response = this.form.response;
    this.shopRequest = this.form.data;

    if (response['tag'].ok) {
      this.shopService.addShop(this.shopRequest).subscribe(
        (response: ApiResponse) => {
          if (response.success) {
            this.closeDialog();
            this.callback(response.success);
          } else this.notification.notifyError(response.message);
        },
        (err) => {
          console.log(err);
          this.notification.notifyError('Unable to create Shop');
        }
      );
    }
  }

  ngOnInit(): void {}
}
