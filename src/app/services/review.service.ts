import { Review } from './../models/review.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { AppService } from './app.service';
import { ProgressDialogService } from './progress-dialog.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(
    private app: AppService,
    private http: HttpClient,
    private progressDialog: ProgressDialogService
  ) {}

  public replyReview(review: Review) {
    this.progressDialog.show('Please Wait..');
    return this.http.post(this.app.endPoint + '/api/review/add',review,this.app.httpAutherizedHeader)
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

  public getReviews(page: number) {
    return this.http
      .get(
        this.app.endPoint +
          '/api/review/get_all?page=' +
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
  public getReviewsBySellerId(sellerId: number, page: number) {
    return this.http
      .get(
        this.app.endPoint +
          '/api/review/get_by_seller/' +
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

  public deleteReviewById(id) {
    return this.http
      .post(
        this.app.endPoint + '/api/review/delete/' + id,
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
