import { AppCluster } from './../../app.shared.cluster';
import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/enum/store.enum';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoginToken } from 'src/app/models/login-token';
import { SettingsService } from 'src/app/services/settings.service';
import { ApiResponse } from 'src/app/models/api-response.model';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  categories: any;

  constructor(
    private app: AppCluster,
    private storage: StorageService,
    private settingSevice: SettingsService,
    private notificationService: NotificationService,
    private authService: AuthenticationService
  ) { }
  public loadCategories() {
    try {
      var categories = this.storage.getSession(Store.CATEGORY);
      if (categories != null) {
        this.categories = JSON.parse(categories);
      } else {
        this.storage.recheck(() => {
          this.loadCategories();
        }, 100);
      }
    } catch (ex) {
      console.log(ex);
      console.log('Unable to convert categories to JSON');
    }
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }
  get authenticatedUser() {
    var user = this.authService.authenticatedUser as LoginToken;
    return user;
  }
  logout() {
    this.authService.logout();
  }
  toggleDrawer() {
    var display = document.getElementById('sidebar').style.display;
    if (display.toLowerCase() == 'block') {
      document.getElementById('sidebar').style.display = 'none';
      this.app.enableScrolling();
    } else {
      document.getElementById('sidebar').style.display = 'block';
      this.app.disableScrolling();
    }
    if (window.innerWidth < 800)
      document.getElementById('page-wrapper').style.marginLeft = '0';
    else
      document.getElementById('page-wrapper').style.marginLeft = '300px';
  }

  clearCatch() {
    this.settingSevice.resetMemory().subscribe(
      (response: ApiResponse) => {
        if (response.success)
          this.notificationService.notifySuccess("Catch cleared successfully");
        else
          this.notificationService.notifyError(response.message)
      },
      (err) => console.log(err)
    );
  }
  ngOnInit(): void {
    this.loadCategories();
  }
}
