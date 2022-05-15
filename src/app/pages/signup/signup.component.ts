import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppCluster } from 'src/app/app.shared.cluster';
import { AccountType } from 'src/app/enum/account-type.enum';
import { Store } from 'src/app/enum/store.enum';
import { UserRole } from 'src/app/enum/user-role.enum';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Location } from 'src/app/models/location.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';
import { List } from 'src/app/types/list.type';
import { FormValidator } from 'src/app/validators/form-custom.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form: FormValidator;
  user: User;
  locations: List<Location>;

  constructor(
    private titleService:Title,
    private app: AppCluster,
    private router: Router,
    private storage: StorageService,
    private authService: AuthenticationService,
    private notification: NotificationService
  ) {
    this.form = new FormValidator(User, 'form');
  }

  public loadLocations() {
    try {
      var locations = this.storage.getSession(Store.LOCATIONS);
      if (locations != null) {
        this.locations = JSON.parse(locations);
      } else {
        setTimeout(() => {
           this.loadLocations();
        }, 300);
      }
    } catch (ex) {
      console.log(ex);
      console.log('Unable to convert locations to JSON');
    }
  }

  async signUp() {
    this.form.revalidate();
    let response = this.form.response;
    this.user = this.form.data;

    if (
      response['name'].ok &&
      response['email'].ok &&
      response['mobile'].ok &&
      response['country'].ok &&
      response['city'].ok &&
      response['password'].ok &&
      response['confirmPassword'].ok
    ) {
      if (this.user.password != this.user.confirmPassword) {
        this.notification.notifyWarning('Password & Confirm Password Mismatch');
      } else if (!this.app.validEmail(this.user.email)) {
        this.notification.notifyWarning('Invalid Email Address');
      } else if (!this.app.validMobile(this.user.mobile)) {
        this.notification.notifyWarning('Invalid Mobile Number');
      } else {
        delete this.user.confirmPassword;
        //format mobile number
        if (!this.user.mobile.startsWith('+234')) {
          if (this.user.mobile.startsWith('0'))
            this.user.mobile = this.user.mobile.replace(/^0/, '+234');
          else this.user.mobile = '+234' + this.user.mobile;
        }

        this.user.accountType = AccountType.BUSINESS;
        this.user.role = UserRole.SELLER;
     
        this.authService.signUp(this.user).subscribe(
          (response: ApiResponse) => {
            if (response.success) {
              this.storage.save(Store.USER, JSON.stringify(response.payload));
              this.router.navigate(['/verify-account']);
            } else {
              this.notification.notifyError(response.message);
            }
          },
          (err) => {
            console.log(err);
            this.notification.notifyError('Unable to create your Account!');
          }
        );
      }
    } else {
      this.notification.notifyWarning('Oops! Form not filled correctly');
    }
  }

  ngOnInit(): void {
    this.titleService.setTitle('Create Business on Lenos Nigeria, Start Selling & Building Customers for your Business Around Nigeria');
    this.loadLocations();
  }
}
