import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response.model';
import { AppService } from './app.service';
import { ProgressDialogService } from './progress-dialog.service';
import { Status } from '../enum/status.enum';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(
    private app: AppService,
    private http: HttpClient,
    private progressDialog: ProgressDialogService
  ) {}

  public getVouchers(page: number) {
    return this.http
      .get(
        this.app.endPoint +
          '/api/cards?page=' +
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

  public deleteCardById(id) {
    return this.http
      .post(
        this.app.endPoint + '/api/card/delete/' + id,
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

  public updateCardStatus(status: Status, carddId: number) {
    return this.http
      .put(
        this.app.endPoint +
          '/api/card/update/status/' +
          carddId +
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
