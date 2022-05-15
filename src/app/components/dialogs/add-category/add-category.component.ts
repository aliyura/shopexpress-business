import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppCluster } from 'src/app/app.shared.cluster';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Category } from 'src/app/models/category.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormValidator } from 'src/app/validators/form-custom.validator';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryModalDialog implements OnInit {
  title: any;
  existingCategory:Category
  callback: any;
  form: FormValidator;
  category: Category;

  constructor(
    private app: AppCluster,
    private notification: NotificationService,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddCategoryModalDialog>
  ) {
    this.title = data.title;
    this.existingCategory=data.existingCategory
    this.callback = data.callback;
    this.form = new FormValidator(Category, 'form');
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addCategory() {
    this.form.revalidate();
    let response = this.form.response;
    this.category = this.form.data;

    if (response['name'].ok && response['type'].ok && response['icon'].ok) {

      //if editing not new...
      if(this.existingCategory!=null)
        this.category.id = this.existingCategory.id;
      if (this.category.image == null)
        this.category.image = this.existingCategory.image;

      this.categoryService.addCategory(this.category).subscribe(
        (response: ApiResponse) => {
          if (response.success) {
            this.closeDialog();
            this.callback(response.success);
          } else this.notification.notifyError(response.message);
        },
        (err) => {
          console.log(err);
          this.notification.notifyError('Unable to save category');
        }
      );
    }
  }

  ngOnInit(): void {}
}
