import { Title } from '@angular/platform-browser';
import { AccountType } from './../../enum/account-type.enum';
import { LoginResponse } from './../../models/login-response.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppCluster } from 'src/app/app.shared.cluster';
import { Store } from 'src/app/enum/store.enum';
import { ApiResponse } from 'src/app/models/api-response.model';
import { UserRequest } from 'src/app/models/user-request.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormValidator } from 'src/app/validators/form-custom.validator';
import { Login } from 'src/app/models/login';
import { LoginToken } from 'src/app/models/login-token';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormValidator;
  userRequest = new UserRequest();

  constructor(
    private app: AppCluster,
    private titleService: Title,
    private router: Router,
    private storage: StorageService,
    private authService: AuthenticationService,
    private notification: NotificationService
  ) {
    this.form = new FormValidator(UserRequest, 'form');
  }

  async getUser() {
    var userData = this.storage.get(Store.USER);
    if (userData != null) {
      var user = JSON.parse(userData);
      this.userRequest.username = user.mobile;
    }
  }

  async signOn(login: Login) {
    this.authService.signIn(login).subscribe((token: LoginToken) => {
      if (token.access_token != null) {
        var signedUser = token as unknown as LoginToken;
        console.log(signedUser);
        if (signedUser.accountType != AccountType.INDIVIDUAL) {
          this.storage.save(Store.TOKEN, token.access_token);
          this.storage.save(
            Store.USER,
            JSON.stringify(signedUser)
          );
          var returnURL = this.storage.getSession('returnURL');
          if (returnURL != null) {
            window.location.href = returnURL;
            this.storage.removeSession('returnURL')
          } else {
            location.href = "/"
          }
        } else {
          this.notification.notifyWarning('This is not a Business account!');
        }
      } else {
        this.notification.notifyError("Something Went Wrong!");
      }
    });
  }

  async signIn() {
    this.form.revalidate();
    let response = this.form.response;
    this.userRequest = this.form.data;
    if (response['username'].ok && response['password'].ok) {

      var login = new Login();
      login.username = this.userRequest.username;
      login.password = this.userRequest.password;
      login.grant_type = environment.grantType;

      if (this.app.validMobile(login.username)) {
        if (!login.username.startsWith('+')) {
          login.username = '+234' + login.username.substring(1, login.username.length);
        }
      }
      this.signOn(login);
    } else {
      this.notification.notifyWarning('Oops! form not filled correctly');
    }
  }

  ngOnInit(): void {
    this.titleService.setTitle(
      'Login to your Business account on -Lenos Nigeria'
    );
    this.getUser();
  }
}
