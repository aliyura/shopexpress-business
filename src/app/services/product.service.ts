import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Status } from '../enum/status.enum';
import { ApiResponse } from '../models/api-response.model';
import { Product } from '../models/product.model';
import { AppService } from './app.service';
import { ProgressDialogService } from './progress-dialog.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private progressDialog: ProgressDialogService,
    private http: HttpClient,
    private app: AppService
  ) { }

  public uploadProduct(product: Product) {
    var form = new FormData();
    if (product.thumbnail != null)
      form.append('thumbnail', product.thumbnail[0]);

    if (product.images != null)
      for (var i = 0; i < product.images.length; i++)
        form.append('images', product.images[i]);

    delete product.images;
    delete product.thumbnail;
    form.append('data', JSON.stringify(product));

    console.log(product);

    this.progressDialog.show('Please Wait..');
    return this.http
      .post(
        this.app.endPoint + '/api/product/add',
        form,
        this.app.httpAutherizedMediaHeader
      )
      .pipe(
        map((response: ApiResponse) => {
          this.progressDialog.hide();
          return response;
        }),
        catchError((error) => {
          this.progressDialog.hide();
          let errorMessage =
            error.message !== undefined ? error.message : error.statusText;
          console.log(errorMessage);
          return throwError('Something Went Wrong');
        })
      );
  }

  public updateProduct(product: Product) {
    var form = new FormData();
    if (product.thumbnail != null)
      form.append('thumbnail', product.thumbnail[0]);

    if (product.images != null)
      for (var i = 0; i < product.images.length; i++)
        form.append('images', product.images[i]);

    delete product.images;
    delete product.thumbnail;
    form.append('data', JSON.stringify(product));

    console.log(product);

    this.progressDialog.show('Please Wait..');
    return this.http
      .post(
        this.app.endPoint + '/api/product/edit',
        form,
        this.app.httpAutherizedMediaHeader
      )
      .pipe(
        map((response: ApiResponse) => {
          this.progressDialog.hide();
          return response;
        }),
        catchError((error) => {
          this.progressDialog.hide();
          let errorMessage =
            error.message !== undefined ? error.message : error.statusText;
          console.log(errorMessage);
          return throwError('Something Went Wrong');
        })
      );
  }

  public getProduct(productId) {
    return this.http
      .get(
        this.app.endPoint + '/api/product/get_by_id/' + productId,
        this.app.httpAutherizedHeader
      )
      .pipe(
        map((response: ApiResponse) => {
          return response;
        }),
        catchError((error) => {
          let errorMessage =
            error.message !== undefined ? error.message : error.statusText;
          console.log(errorMessage);
          return throwError('Something Went Wrong');
        })
      );
  }

  public getAllProducts(page: number) {
    return this.http
      .get(
        this.app.endPoint +
        '/api/product/get_all?page=' +
        page +
        '&size=' +
        environment.pageSize,
        this.app.httpAutherizedHeader
      )
      .pipe(
        map((response: ApiResponse) => {
          return response;
        }),
        catchError((error) => {
          let errorMessage =
            error.message !== undefined ? error.message : error.statusText;
          console.log(errorMessage);
          return throwError('Something Went Wrong');
        })
      );
  }

  public getAllProductsBySeller(sellerId: number, page: number) {
    return this.http
      .get(
        this.app.endPoint +
        '/api/product/get_all_by_seller/' +
        sellerId +
        '?page=' +
        page +
        '&size=' +
        environment.pageSize,
        this.app.httpAutherizedHeader
      )
      .pipe(
        map((response: ApiResponse) => {
          return response;
        }),
        catchError((error) => {
          let errorMessage =
            error.message !== undefined ? error.message : error.statusText;
          console.log(errorMessage);
          return throwError('Something Went Wrong');
        })
      );
  }
  public updateProductStatus(status: Status, productId: number) {
    return this.http
      .put(
        this.app.endPoint +
        '/api/product/status/update/' +
        productId +
        '?status=' +
        status,
        {},
        this.app.httpAutherizedHeader
      )
      .pipe(
        map((response: ApiResponse) => {
          return response;
        }),
        catchError((error) => {
          let errorMessage =
            error.message !== undefined ? error.message : error.statusText;
          console.log(errorMessage);
          return throwError('Something Went Wrong');
        })
      );
  }

  public deleteProductById(productId: number) {
    return this.http
      .post(
        this.app.endPoint + '/api/product/delete/' + productId,
        {},
        this.app.httpAutherizedHeader
      )
      .pipe(
        map((response: ApiResponse) => {
          return response;
        }),
        catchError((error) => {
          let errorMessage =
            error.message !== undefined ? error.message : error.statusText;
          console.log(errorMessage);
          return throwError('Something Went Wrong');
        })
      );
  }
}
