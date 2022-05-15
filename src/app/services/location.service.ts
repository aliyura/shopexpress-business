import { Location } from 'src/app/models/location.model';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/api-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { ProgressDialogService } from './progress-dialog.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(
    private progressDialog: ProgressDialogService,
    private app: AppService, private http: HttpClient) { }

  public addLocation(location: Location) {
    this.progressDialog.show('Please Wait..');
    return this.http.post(this.app.endPoint + '/api/location/add',
      location,
      this.app.httpAutherizedHeader
    ).pipe(
      map((response: ApiResponse) => {
        this.progressDialog.hide();
        console.log(response);
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

  public getLocations() {
    return this.http
      .get(this.app.endPoint + '/api/locations', this.app.httpHeader)
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

  public getLocationByCode(cityCode) {
    return this.http
      .get(this.app.endPoint + '/api/location/get_by_code/' + cityCode, this.app.httpAutherizedMediaHeader)
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

  public deleteLocationById(id) {
    return this.http
      .post(
        this.app.endPoint + '/api/location/delete/' + id,
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
