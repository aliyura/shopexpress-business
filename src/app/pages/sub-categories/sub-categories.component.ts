import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/api-response.model';
import { SubCategory } from 'src/app/models/sub-category.model';
import { CategoryService } from 'src/app/services/category.service';
import { DialogHandlerService } from 'src/app/services/dialog-handler.service';
import { NotificationService } from 'src/app/services/notification.service';
import { List } from 'src/app/types/list.type';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css']
})
export class SubCategoriesComponent implements OnInit {

  categories: List<SubCategory>;
  categoryId: string = '0';
  isLoading: boolean = true;

  constructor(
    private route:ActivatedRoute,
    private notification:NotificationService,
    private dialogHandler: DialogHandlerService,
    private categoryService: CategoryService
  ) {}

  private getSubCategoriesById(id) {
    this.isLoading = true;
    this.categoryService.getSubCategoriesByCategoryId(id).subscribe(
      (response: ApiResponse) => {
        this.isLoading = false;
          if (response.success){
            this.categories = response.payload;
          }
        },
      (err) => {
        this.isLoading = false;
          console.log(err);
        }
      );
  }

  deleteSubCategory(category:SubCategory){
    this.dialogHandler.requestConfirmation(
      'Delete Category',
      'Are you sure you want to delete sub category ' + category.name + '?',
      (yes) => {
        if (yes) {
          this.categoryService.deleteSubCategoryById(category.id).subscribe(
            (response: ApiResponse) => {
              if (response.success) this.getSubCategoriesById(this.categoryId);
            },
            (err) => console.log(err)
          );
        }
      }
    );
  }


  addSubCategory() {
    this.dialogHandler.requestAddSubCategoryDialog(this.categoryId,'Add Sub Category', (response) => {
      if(response){
        this.notification.notifySuccess("Added Successfully");
        this.getSubCategoriesById(this.categoryId);
      }else{
        this.notification.notifyError("Unable to create the sub category");
      }
    });
  }

  editSubCategory(existingSubCategory:SubCategory) {
    this.dialogHandler.requestEditSubCategoryDialog(this.categoryId,existingSubCategory,'Edit Sub Category', (response) => {
      if(response){
        this.notification.notifySuccess("Saved Successfully");
        this.getSubCategoriesById(this.categoryId);
      }else{
        this.notification.notifyError("Unable to edit the sub category");
      }
    });
  }
  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    this.getSubCategoriesById(this.categoryId);
  }

}
