import { AppCluster } from './../../app.shared.cluster';
import { AccountType } from './../../enum/account-type.enum';
import { CounterResponse } from './../../models/counter-response.model';
import { StorageService } from './../../services/storage.service';
import { CounterService } from './../../services/counter.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogHandlerService } from 'src/app/services/dialog-handler.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Store } from 'src/app/enum/store.enum';
import { LoginToken } from 'src/app/models/login-token';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  counts: CounterResponse;
  appAccountType = AccountType;

  constructor(
    private app:AppCluster,
    private authService: AuthenticationService,
    private dialogHandler: DialogHandlerService,
    private notification: NotificationService,
    private storage: StorageService
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

  public loadCounts() {
    try {
      var counts = this.storage.getSession(Store.COUNTS);
      if (counts != null) {
        this.counts = JSON.parse(counts) as CounterResponse;
      } else {
        this.storage.recheck(() => {
          this.loadCounts();
        }, 100);
      }
    } catch (ex) {
      console.log(ex);
      console.log('Unable to convert counts to JSON');
    }
  }

  addCategory() {
    this.dialogHandler.requestAddCategoryDialog('Add Category', (response) => {
      if (response) {
        this.notification.notifySuccess('Added Successfully');
      } else {
        this.notification.notifyError('Unable to edit the category');
      }
    });
  }
  closeDrawer() {
    if (window.innerWidth < 800) {
      document.getElementById('sidebar').style.display = 'none';
      this.app.enableScrolling();
    }
  }
  ngOnInit(): void {
    this.loadCounts();
  }

  ngAfterViewInit(): void {
    document.querySelectorAll('#side-menu li').forEach((el) => {
      el.addEventListener('click', (e) => {

        if (el.querySelector('ul') != null) {
          if (el.querySelector('ul').classList.contains('collapse'))
            el.querySelector('ul').classList.remove('collapse');
          else el.querySelector('ul').classList.add('collapse');

          el.querySelector('ul li').addEventListener('click', (e) => {
            if (window.innerWidth < 800) {
              document.getElementById('sidebar').style.display = 'none';
              document.getElementById('overlay').style.display = 'none';
              this.app.enableScrolling();
            }
          });
        } else {
          if (window.innerWidth < 800) {
            document.getElementById('sidebar').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
            this.app.enableScrolling();
          }
        }
      });
    });
  }
}
