import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Category } from 'src/app/models/category.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CategoryService } from 'src/app/services/category.service';
import { DialogHandlerService } from 'src/app/services/dialog-handler.service';
import { NotificationService } from 'src/app/services/notification.service';
import { List } from 'src/app/types/list.type';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: List<Category>;
  isLoading: boolean = true;

  constructor(
    private notification: NotificationService,
    private dialogHandler: DialogHandlerService,
    private categoryService: CategoryService
  ) {}

  private getCategories() {
    this.isLoading = true;
    this.categoryService.getAllCategories().subscribe(
      (response: ApiResponse) => {
        this.isLoading = false;
        if (response.success) {
          this.categories = response.payload;
        }
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  deleteCategory(category: Category) {
    this.dialogHandler.requestConfirmation(
      'Delete Category',
      'Are you sure you want to delete category ' + category.name + '?',
      (yes) => {
        if (yes) {
          this.categoryService.deleteCategoryById(category.id).subscribe(
            (response: ApiResponse) => {
              if (response.success) this.getCategories();
            },
            (err) => console.log(err)
          );
        }
      }
    );
  }

  addCategory() {
    this.dialogHandler.requestAddCategoryDialog('Add Category', (response) => {
      if (response) {
        this.notification.notifySuccess('Added Successfully');
        this.getCategories();
      } else {
        this.notification.notifyError('Unable to edit the category');
      }
    });
  }

  editCategory(existingCategory:Category) {
    this.dialogHandler.requestEditCategoryDialog(existingCategory,'Edit Category', (response) => {
      if (response) {
        this.notification.notifySuccess('Saved Successfully');
        this.getCategories();
      } else {
        this.notification.notifyError('Unable to create the category');
      }
    });
  }
  ngOnInit(): void {
    this.getCategories();
  }
}
