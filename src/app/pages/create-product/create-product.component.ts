import { List } from './../../types/list.type';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppCluster } from 'src/app/app.shared.cluster';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { SubCategory } from 'src/app/models/sub-category.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormValidator } from 'src/app/validators/form-custom.validator';
import { Location } from 'src/app/models/location.model';
import { Store } from 'src/app/enum/store.enum';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  categories: List<Category>;
  subCategories: List<SubCategory>;
  form: FormValidator;
  product: Product;
  locations: List<Location>
  editing: Boolean = false;

  constructor(
    private app: AppCluster,
    private storage: StorageService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private notification: NotificationService
  ) {
    this.form = new FormValidator(Product, 'form');
  }

  public loadLocations() {
    try {
      var locations = this.storage.getSession(Store.LOCATIONS);
      if (locations != null) {
        this.locations = JSON.parse(locations);
      } else {
        this.app.monitor(() => {
          this.loadLocations();
        }, 1000);
      }
    } catch (ex) {
      console.log(ex);
      console.log('Unable to convert locations to JSON');
    }
  }

  public uploadProduct() {
    this.form.revalidate();
    let response = this.form.response;
    let currentProduct = this.form.data as Product;
    delete currentProduct['null'];

    if (
      response['name'].ok &&
      response['categoryId'].ok &&
      response['subCategoryId'].ok &&
      response['deliveryDays'].ok &&
      response['location'].ok &&
      response['stock'].ok &&
      response['price'].ok
    ) {
      if (this.app.validDigits(currentProduct.price)) {
        if (this.app.validDigits(currentProduct.stock)) {

          if (this.editing) {

            //set required images if not set
            currentProduct.id = this.product.id;
            if (currentProduct.thumbnail == null)
              currentProduct.thumbnail = this.product.thumbnail

            if (currentProduct.images == null)
              currentProduct.images = this.product.images

            this.productService.updateProduct(currentProduct).subscribe(
              (response: ApiResponse) => {
                if (response.success) {
                  this.notification.notifySuccess('Uploaded Successfully');
                  this.notification.showSuccess(
                    'Saved Successfully',
                    'product.add',
                    'Upload Another'
                  );
                } else {
                  console.log(response.message);
                  this.notification.notifyError(response.message);
                }
              },
              (err) => {
                console.log(err);
                this.notification.notifyError('Unable to upload the Product');
              }
            );

          } else {
            if (currentProduct.thumbnail == null) {
              this.notification.notifyWarning('Product thumbnail required');
            } else if (currentProduct.images == null) {
              this.notification.notifyWarning('Product images required');
            }
            else {
              this.productService.uploadProduct(currentProduct).subscribe(
                (response: ApiResponse) => {
                  if (response.success) {
                    this.notification.notifySuccess('Uploaded Successfully');
                    this.notification.showSuccess(
                      'Uploaded Successfully',
                      'product.add',
                      'Upload Another'
                    );
                  } else {
                    console.log(response.message);
                    this.notification.notifyError(response.message);
                  }
                },
                (err) => {
                  console.log(err);
                  this.notification.notifyError('Unable to upload the Product');
                }
              );
            }
          }

        } else {
          this.notification.notifyError('Only Number Excepted in Maximum Qunatity Input');
        }
      } else {
        this.notification.notifyError('Only Number Excepted in Price Input');
      }
    }
  }

  public onCategorySelected(e) {
    this.getSubCategoriesByCategoryId(e.target.value);
  }
  public getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      (response: ApiResponse) => {
        console.log(response.payload);
        if (response.success) this.categories = response.payload;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public getSubCategoriesByCategoryId(id) {
    this.categoryService.getSubCategoriesByCategoryId(id).subscribe(
      (response: ApiResponse) => {
        if (response.success) this.subCategories = response.payload;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    var productId = this.app.getURLParameter(window.location.href);
    this.productService.getProduct(productId).subscribe((response: ApiResponse) => {
      if (response.success) {
        if (response.payload != null) {
          this.product = response.payload as Product;
          this.editing = true;
        }
      }
    });
    this.loadLocations();
    this.getAllCategories();
  }
}
