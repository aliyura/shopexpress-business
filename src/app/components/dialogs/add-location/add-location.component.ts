import { LocationService } from './../../../services/location.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppCluster } from 'src/app/app.shared.cluster';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Category } from 'src/app/models/category.model';
import { Location } from 'src/app/models/location.model';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/services/notification.service';
import { FormValidator } from 'src/app/validators/form-custom.validator';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css'],
})
export class AddLocationModalDialog implements OnInit {
  title: any;
  existingLocation: Location;
  callback: any;
  form: FormValidator;
  location: Location;

  constructor(
    private app: AppCluster,
    private notification: NotificationService,
    private locationService: LocationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddLocationModalDialog>
  ) {
    this.title = data.title;
    this.existingLocation = data.existingLocation;
    this.callback = data.callback;
    this.form = new FormValidator(Category, 'form');
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addCategory() {
    this.form.revalidate();
    let response = this.form.response;
    this.location = this.form.data;

    if (response['description'].ok && response['deliveryFee'].ok) {
      
      //if editing not new...
      if (this.existingLocation != null)
        this.location.id = this.existingLocation.id;
    
      console.log(this.location);
      this.locationService.addLocation(this.location).subscribe(
        (response: ApiResponse) => {
          if (response.success) {
            this.closeDialog();
            this.callback(response.success);
          } else this.notification.notifyError(response.message);
        },
        (err) => {
          console.log(err);
          this.notification.notifyError('Unable to save location');
        }
      );
    }
  }

  ngOnInit(): void {}
}
