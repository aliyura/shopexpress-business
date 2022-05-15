import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AccountType } from '../enum/account-type.enum';
import { Status } from '../enum/status.enum';
import { Store } from '../enum/store.enum';
import { UserRole } from '../enum/user-role.enum';
import { ApiResponse } from '../models/api-response.model';
import { Login } from '../models/login';
import { LoginToken } from '../models/login-token';
import { UserRequest } from '../models/user-request.model';
import { UserVerificationRequest } from '../models/user-verification-request.model';
import { User } from '../models/user.model';
import { AppService } from './app.service';
import { NotificationService } from './notification.service';
import { ProgressDialogService } from './progress-dialog.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {


  clientId = environment.clientId;
  clientSecret = environment.clientSecret;
  tokenEndpoint = environment.tokenBaseEndpoint;



  constructor(
    private app: AppService,
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private store: StorageService,
    private notificationService: NotificationService,
    private progressDialog: ProgressDialogService
  ) { }

  get authenticatedUser() {
    var appUser: LoginToken;
    var user = this.store.get(Store.USER);
    if (user != null) appUser = JSON.parse(user) as LoginToken;
    return appUser;
  }

  get isAuthenticated() {
    return !!this.store.get(Store.TOKEN);
  }

  get getBearerToken() {
    var bearer = this.store.get(Store.TOKEN);
    console.log(bearer);
    return bearer;
  }
  logout() {
    this.store.remove(Store.TOKEN);
    this.store.remove(Store.USER);
    location.href = '/login';
  }

  public signUp(user: User) {
    this.progressDialog.show('Please Wait..');
    return this.http
      .post(this.app.endPoint + '/api/user/signup', user, this.app.httpHeader)
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
  public updateProfile(user: User) {
    this.progressDialog.show('Please Wait..');
    return this.http
      .put(
        this.app.endPoint + '/api/user/profile/update',
        user,
        this.app.httpAutherizedHeader
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

  signIn(login: Login) {
    console.log(login)
    this.progressDialog.show("")
    let params = new URLSearchParams();
    params.append('grant_type', login.grant_type);
    params.append('username', login.username);
    params.append('password', login.password);
    if (login.oauth_token != null)
      params.append('oauth_token', login.oauth_token)

    const basicAuth = 'Basic ' + btoa(this.clientId + ':' + this.clientSecret);
    console.log(basicAuth);

    let headers = new HttpHeaders(
      {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': basicAuth
      });

    return this.http.post(this.tokenEndpoint, params.toString(), { headers: headers })
      .pipe(
        map((token: LoginToken) => {
          this.progressDialog.hide();
          return token;
        }),
        catchError((error) => {
          console.log(error)
          this.progressDialog.hide();
          let errorMessage = error.error.error_description;
          console.log(errorMessage);
          console.log(error.status);
          console.log(error.statusText);
          var message = error.statusText;

          if (parseInt(error.status) <= 0) {
            message = "Connection Failed";
          }
          else if (parseInt(error.status) == 401) {
            message = "Invalid Username or Password!";
          }
          else if (parseInt(error.status) == 400) {
            message = errorMessage;
          }
          else {
            message = "Login Failed, Please retry!";
          }
          this.notificationService.notifyError(message);
          return throwError(message);
        })
      );

  }

  public verifyAccount(request: UserVerificationRequest) {
    this.progressDialog.show('Verifying..');
    return this.http
      .post(
        this.app.endPoint + '/api/user/verify',
        request,
        this.app.httpHeader
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
  public updateUserStatus(status: Status, userId: number) {
    return this.http
      .put(
        this.app.endPoint +
        '/api/user/status/update/' +
        userId +
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
  public deleteUserById(userId: number) {
    return this.http
      .post(
        this.app.endPoint + '/api/user/delete/' + userId,
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

  public sendOTP(request: UserRequest) {
    this.progressDialog.show('Please Wait..');
    return this.http
      .post(
        this.app.endPoint + '/api/user/generate/otp',
        request,
        this.app.httpHeader
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

  public getUsersByAccountType(page: number, type: AccountType) {
    return this.http
      .get(
        this.app.endPoint +
        '/api/get_users_by_account_type?type=' +
        type +
        '&size=' +
        environment.pageSize +
        '&page=' +
        page,
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
  public getUsersByRole(page: number, role: UserRole) {
    return this.http
      .get(
        this.app.endPoint +
        '/api/get_users_by_role?role=' +
        role +
        '&size=' +
        environment.pageSize +
        '&page=' +
        page,
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

  public getUserByUiid(uiid: string) {
    return this.http
      .get(
        this.app.endPoint + '/api/get_user_by_uiid/' + uiid,
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
