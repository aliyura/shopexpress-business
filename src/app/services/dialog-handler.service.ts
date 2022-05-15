import { AddShopComponent } from './../components/dialogs/add-shop/add-shop.component';
import { AddLocationModalDialog } from './../components/dialogs/add-location/add-location.component';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { WarningModalAlert } from '../components/dialogs/warning-modal.alert';
import { ConfirmationModalAlert } from '../components/dialogs/confirmation-modal.alert';
import { AddCategoryModalDialog } from '../components/dialogs/add-category/add-category.component';
import { AddSubCategoryModalDialog } from '../components/dialogs/add-sub-category/add-sub-category.component';
import { EditProfileModalDialog } from '../components/dialogs/edit-profile/edit-profile.component';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root',
})
export class DialogHandlerService {
  modalSize = 320;
  constructor(private snackbar: MatSnackBar, private dialog: MatDialog) {
    if (window.screen.width < 600) this.modalSize = 300;
    else this.modalSize = window.screen.width / 2.5;
  }

  handleError(error) {
    console.error(error);
    this.snackbar.open(error, 'close', { duration: 10000 });
  }
  displayWarning(title: string, body: string) {
    this.dialog.open(WarningModalAlert, {
      width: this.modalSize + 'px',
      data: {
        title: title,
        body: body,
      },
      // disableClose: true,
    });
  }

  requestConfirmation(title, body, callback) {
    this.dialog.open(ConfirmationModalAlert, {
      width: this.modalSize + 'px',
      data: {
        title: title,
        body: body,
        callback: callback,
      },
    });
  }

  requestAddCategoryDialog(title, callback) {
    this.dialog.open(AddCategoryModalDialog, {
      width: this.modalSize + 'px',
      data: {
        existingCategory: null,
        title: title,
        callback: callback,
      },
    });
  }
  requestAddShopDialog(title, callback) {
    this.dialog.open(AddShopComponent, {
      width: this.modalSize + 'px',
      data: {
        title: title,
        callback: callback,
      },
    });
  }
  requestEditCategoryDialog(existingCategory, title, callback) {
    this.dialog.open(AddCategoryModalDialog, {
      width: this.modalSize + 'px',
      data: {
        existingCategory: existingCategory,
        title: title,
        callback: callback,
      },
    });
  }
  requestAddSubCategoryDialog(categoryId, title, callback) {
    this.dialog.open(AddSubCategoryModalDialog, {
      width: this.modalSize + 'px',
      data: {
        categoryId: categoryId,
        existingSubCategory: null,
        title: title,
        callback: callback,
      },
    });
  }
  requestEditSubCategoryDialog(
    categoryId,
    existingSubCategory,
    title,
    callback
  ) {
    this.dialog.open(AddSubCategoryModalDialog, {
      width: this.modalSize + 'px',
      data: {
        categoryId: categoryId,
        existingSubCategory: existingSubCategory,
        title: title,
        callback: callback,
      },
    });
  }

  requestEditProfileDialog(title, callback) {
    this.dialog.open(EditProfileModalDialog, {
      width: this.modalSize + 'px',
      data: {
        title: title,
        callback: callback,
      },
    });
  }
  requestEditLocationDialog(existingLocation: Location, title, callback) {
    this.dialog.open(AddLocationModalDialog, {
      width: this.modalSize + 'px',
      data: {
        existingLocation: existingLocation,
        title: title,
        callback: callback,
      },
    });
  }
}
