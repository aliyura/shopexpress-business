import { AccountType } from './../../enum/account-type.enum';
import { LocationService } from './../../services/location.service';
import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/models/location.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogHandlerService } from 'src/app/services/dialog-handler.service';
import { List } from 'src/app/types/list.type';
import { Store } from 'src/app/enum/store.enum';
import { CounterResponse } from 'src/app/models/counter-response.model';
import { ApiResponse } from 'src/app/models/api-response.model';
import { NotificationService } from 'src/app/services/notification.service';
import { User } from 'src/app/models/user.model';
import { LoginToken } from 'src/app/models/login-token';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
})
export class LocationsComponent implements OnInit {
  locations: List<Location>;
  appAccountType = AccountType;
  isLoading: boolean = true;

  constructor(
    private authService: AuthenticationService,
    private dialogHandler: DialogHandlerService,
    private locationService: LocationService,
    private notification: NotificationService,
    private storage: StorageService
  ) {}

  public loadLocations() {
    this.isLoading = true;
    try {
      var locations = this.storage.getSession(Store.LOCATIONS);
      if (locations != null) {
        this.locations = JSON.parse(locations);
        console.log(this.locations);
      } else {
        this.storage.recheck(() => {
          this.loadLocations();
        }, 100);
      }
    } catch (ex) {
      console.log(ex);
      console.log('Unable to convert locations to JSON');
    }
    this.isLoading = false;
  }

  editLocation(location: Location) {
    this.dialogHandler.requestEditLocationDialog(
      location,
      'Edit Location',
      (response) => {
        if (response) {
          this.notification.notifySuccess('Saved Successfully');
          this.loadLocations();
        } else {
          this.notification.notifyError('Unable to update the location');
        }
      }
    );
  }

  deleteLocation(location: Location) {
    this.dialogHandler.requestConfirmation(
      'Delete Category',
      'Are you sure you want to delete location ' + location.description + '?',
      (yes) => {
        if (yes) {
          this.locationService.deleteLocationById(location.id).subscribe(
            (response: ApiResponse) => {
              console.log(response);
              if (response.success) this.loadLocations();
            },
            (err) => console.log(err)
          );
        }
      }
    );
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }
  get authenticatedUser() {
    return this.authService.authenticatedUser as LoginToken;
  }

  ngOnInit(): void {
    this.loadLocations();
  }
}

