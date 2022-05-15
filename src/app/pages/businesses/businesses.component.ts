import { Component, OnInit } from '@angular/core';
import { AccountType } from 'src/app/enum/account-type.enum';
import { Status } from 'src/app/enum/status.enum';
import { ApiResponse } from 'src/app/models/api-response.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogHandlerService } from 'src/app/services/dialog-handler.service';
import { List } from 'src/app/types/list.type';

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.css'],
})
export class BusinessesComponent implements OnInit {
  users: List<User>;
  currentPage: number = 0;
  totalPages: number = 0;
  isLoading: boolean = true;

  constructor(
    private dialogHandler: DialogHandlerService,
    private authService: AuthenticationService
  ) {}

  private getUsers(page: number) {
    this.isLoading = true;
    this.currentPage = page;
    console.log(page)
    this.authService
      .getUsersByAccountType(page, AccountType.BUSINESS)
      .subscribe(
        (response: ApiResponse) => {
          this.isLoading = false;
          console.log(response);
          if (response.success) {
            console.log('yes');
            this.users = response.payload['content'];
            this.totalPages = response.payload['totalPages'];
          }
        },
        (err) => {
          this.isLoading = false;
          console.log(err);
        }
      );
  }

  deleteUser(user: User) {
    this.dialogHandler.requestConfirmation(
      'Delete User',
      'Are you sure you want to delete user ' + user.name + '?',
      (yes) => {
        if (yes) {
          this.authService.deleteUserById(user.id).subscribe(
            (response: ApiResponse) => {
              if (response.success) this.getUsers(this.currentPage);
            },
            (err) => console.log(err)
          );
        }
      }
    );
  }

  activate(e, user: User) {
    var status = Status.AC;
    if (e.target.checked) status = Status.AC;
    else status = Status.IA;

    this.authService.updateUserStatus(status, user.id).subscribe(
      (response: ApiResponse) => {
        if (!response.success) e.target.checked = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  changePage(self,index) {
    self.currentPage = index;
    self.getUsers(self.currentPage);
  }

  ngOnInit(): void {
    this.getUsers(0);
  }
}
