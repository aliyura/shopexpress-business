import { Store } from 'src/app/enum/store.enum';
import { StorageService } from 'src/app/services/storage.service';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogHandlerService } from 'src/app/services/dialog-handler.service';
import { NotificationService } from 'src/app/services/notification.service';
import { LoginToken } from 'src/app/models/login-token';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser: LoginToken;

  constructor(
    private authService: AuthenticationService,
    private dialogHandler: DialogHandlerService,
    private notification: NotificationService,
    private storageService: StorageService
  ) {}

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }
  get authenticatedUser() {
    return this.authService.authenticatedUser as LoginToken;
  }

  logout() {
    this.authService.logout();
  }

  getUser() {
    var user = this.storageService.get(Store.USER);
    if (user != null) {
      this.currentUser = JSON.parse(user) as LoginToken;
    }
  }
  editProfile() {
    this.dialogHandler.requestEditProfileDialog(
      'Edit Profile',
      (response: ApiResponse) => {
        if (response.success) {
          console.log(response);
          this.getUser();
        } else {
          this.notification.notifyError('Failed to update profile');
        }
      }
    );
  }

  ngOnInit(): void {
    this.currentUser = this.authenticatedUser;
  }
}
