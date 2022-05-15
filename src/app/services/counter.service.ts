import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/api-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Category } from '../models/category.model';
import { ProgressDialogService } from './progress-dialog.service';
import { SubCategory } from '../models/sub-category.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  constructor(
    private app: AppService,
    private http: HttpClient,
    private progressDialog: ProgressDialogService
  ) {}

  public getCounts() {
    return this.http
      .get(
        this.app.endPoint + '/api/counter/get_counts',
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
  public getSellerCounts() {
    return this.http
      .get(
        this.app.endPoint + '/api/counter/get_seller_counts',
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
