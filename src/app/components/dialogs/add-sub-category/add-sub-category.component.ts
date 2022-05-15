import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppCluster } from 'src/app/app.shared.cluster';
import { ApiResponse } from 'src/app/models/api-response.model';
import { SubCategory } from 'src/app/models/sub-category.model';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/services/notification.service';
import { FormValidator } from 'src/app/validators/form-custom.validator';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.css'],
})

export class AddSubCategoryModalDialog implements OnInit {
  title: any;
  categoryId:any;
  existingSubCategory:SubCategory
  callback: any;
  form: FormValidator;
  subCategory: SubCategory;

  constructor(
    private app: AppCluster,
    private notification: NotificationService,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddSubCategoryModalDialog>
  ) {
    this.title = data.title;
    this.categoryId=data.categoryId;
    this.existingSubCategory=data.existingSubCategory;
    this.callback = data.callback;
    this.form = new FormValidator(SubCategory, 'form');
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addCategory() {
    this.form.revalidate();
    let response = this.form.response;
    this.subCategory = this.form.data;

    if (response['name'].ok) {

      //if editing not new
      if(this.existingSubCategory!=null)
        this.subCategory.id=this.existingSubCategory.id;
      
      //set the category id
      this.subCategory.categoryId=this.categoryId;
      
      this.categoryService.addSubCategory(this.subCategory).subscribe(
        (response: ApiResponse) => {
          if (response.success) {
            this.closeDialog();
            this.callback(response.success);
          } else this.notification.notifyError(response.message);
        },
        (err) => {
          console.log(err);
          this.notification.notifyError('Unable to save subCategory');
        }
      );
    }
  }

  ngOnInit(): void {}
}
