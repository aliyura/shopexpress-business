import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppCluster } from 'src/app/app.shared.cluster';
import { Store } from 'src/app/enum/store.enum';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Category } from 'src/app/models/category.model';
import { LoginToken } from 'src/app/models/login-token';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormValidator } from 'src/app/validators/form-custom.validator';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileModalDialog implements OnInit {
  title: any;
  callback: any;
  form: FormValidator;
  user: User;

  constructor(
    private app: AppCluster,
    private storage:StorageService,
    private notification: NotificationService,
    private authService:AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditProfileModalDialog>
  ) {
    this.title = data.title;
    this.callback = data.callback;
    this.form = new FormValidator(User, 'form');
  }

  closeDialog() {
    this.dialogRef.close();
  }
  get isAuthenticated(){
    return this.authService.isAuthenticated;
  }
  get authenticatedUser(){
    return this.authService.authenticatedUser as LoginToken;
  }
  logout(){
    this.authService.logout();
  }

  updateProfile() {
      this.form.revalidate();
      let response = this.form.response;
      this.user = this.form.data;
      if (
        response['name'].ok &&
        response['email'].ok &&
        response['mobile'].ok &&
        response['country'].ok &&
        response['city'].ok &&
        response['address'].ok
       ) {

        if (!this.app.validEmail(this.user.email)) {
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

          this.authService.updateProfile(this.user).subscribe(
            (response: ApiResponse) => {
              if (response.success) {
                this.storage.save(Store.USER, JSON.stringify(response.payload));
                this.callback(response);
              } else {
                this.notification.notifyError(response.message);
              }
            },
            (err) => {
              console.log(err);
              this.notification.notifyError('Unable to update your Profile!');
            }
          );
        }
      }
  }

  ngOnInit(): void {}
}
