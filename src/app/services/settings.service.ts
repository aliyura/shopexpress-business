import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response.model';
import { AppService } from './app.service';
import { ProgressDialogService } from './progress-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private app: AppService,
    private http: HttpClient,
    private progressDialog: ProgressDialogService
  ) { }

  public resetMemory() {
    this.progressDialog.show('Please Wait..');
    return this.http.post(this.app.endPoint + '/api/memory/reset', null, this.app.httpAutherizedHeader)
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


}
