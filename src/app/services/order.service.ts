import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Status } from '../enum/status.enum';
import { ApiResponse } from '../models/api-response.model';
import { AppService } from './app.service';
import { ProgressDialogService } from './progress-dialog.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private app: AppService,
    private http: HttpClient,
    private progressDialog: ProgressDialogService
  ) { }

  public getOrders(page: number) {
    return this.http
      .get(
        this.app.endPoint +
        '/api/orders?page=' +
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

  public getOrdersByCity(page: number, city) {
    return this.http
      .get(
        this.app.endPoint +
        '/api/orders/get_by_city/' + city + '?page=' +
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

  public getCityOrdersAnalytic() {
    return this.http
      .get(
        this.app.endPoint +
        '/api/orders/get_cities_analytics',
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
  public getOrdersBySellerId(sellerId: number) {
    return this.http.get(this.app.endPoint + '/api/orders/get_by_seller/' + sellerId,
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

  public getOrderDetailsByOrderId(orderId: number) {
    return this.http
      .get(
        this.app.endPoint + '/api/order/details/get_by_order/' + orderId,
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

  public getOrderByOrderId(orderId: number) {
    return this.http
      .get(
        this.app.endPoint + '/api/order/get_by_id/' + orderId,
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

  public deleteOrderById(id) {
    return this.http
      .post(
        this.app.endPoint + '/api/order/delete/' + id,
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

  public updateOrderStatus(status: Status, orderId: number) {
    return this.http
      .put(
        this.app.endPoint +
        '/api/order/status/update/' +
        orderId +
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
}
