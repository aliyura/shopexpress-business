import { ReviewResponse } from './../../models/review-response.model';
import { Review } from './../../models/review.model';
import { List } from './../../types/list.type';
import { ReviewService } from './../../services/review.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { ApiResponse } from 'src/app/models/api-response.model';
import { AccountType } from 'src/app/enum/account-type.enum';
import { DialogHandlerService } from 'src/app/services/dialog-handler.service';
import { User } from 'src/app/models/user.model';
import { NotificationService } from 'src/app/services/notification.service';
import { LoginToken } from 'src/app/models/login-token';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  reviews: List<ReviewResponse>;
  currentPage: number = 0;
  totalPages: number = 0;
  appAccountType = AccountType;
  isLoading: boolean = true;

  constructor(
    private dialogHandler: DialogHandlerService,
    private authService: AuthenticationService,
    private notification:NotificationService,
    private reviewService: ReviewService,

  ) {}

  private getReviews(page: number) {
    this.isLoading = true;
    this.reviewService.getReviews(page).subscribe(
      (response: ApiResponse) => {
        this.isLoading = false;
        if (response.success) {
          this.reviews = response.payload['content'];
          this.totalPages = response.payload['totalPages'];
        }
      },
      (err) => {
           this.isLoading = false;
        console.log(err);
      }
    );
  }
  private getReviewsBySeller(sellerId: number, page: number) {
     this.isLoading = true;
    this.reviewService.getReviewsBySellerId(sellerId, page).subscribe(
      (response: ApiResponse) => {
         this.isLoading = false;
        if (response.success) {
          this.reviews = response.payload['content'];
          this.totalPages = response.payload['totalPages'];
        }
        console.log(response);
      },
      (err) => {
         this.isLoading = false;
        console.log(err);
      }
    );
  }

  error(e) {
    e.target.src = '/assets/images/notfound.png';
  }

  reply(e, reviewData:ReviewResponse){
    var parent = e.target.parentElement;
    var input = parent.querySelector('#replyInput');
    var value = input.value;
    if (value != null && value != "") {

      //reply review object
      var newReview = new Review();
      newReview.productId = reviewData.review.productId;
      newReview.userId = this.authService.authenticatedUser.id
      newReview.review = "@" + reviewData.user.name + " " + value;

      this.reviewService.replyReview(newReview).subscribe(
        (response: ApiResponse) => {
          if (response.success) {
            this.notification.notifySuccess("Sent");
             if (this.authenticatedUser.accountType == AccountType.ADMIN)
               this.getReviews(this.currentPage);
             else
               this.getReviewsBySeller(
                 this.authenticatedUser.id,
                 this.currentPage
               );
          }
        },
        (err) => console.log(err)
      );
    } else {

    }

  }

  deleteReview(review: Review) {
    this.dialogHandler.requestConfirmation(
      'Delete Review',
      'Are you sure you want to delete this review?',
      (yes) => {
        if (yes) {
          this.reviewService.deleteReviewById(review.id).subscribe(
            (response: ApiResponse) => {
              if (response.success) {
                if (this.authenticatedUser.accountType == AccountType.ADMIN)
                  this.getReviews(this.currentPage);
                else
                  this.getReviewsBySeller(
                    this.authenticatedUser.id,
                    this.currentPage
                  );
              }
            },
            (err) => console.log(err)
          );
        }
      }
    );
  }

  changePage(self, page) {
    self.currentPage = page;
    if (self.authenticatedUser.accountType == AccountType.ADMIN)
      self.getReviews(self.currentPage);
    else self.getReviewsBySeller(self.authenticatedUser.id, self.currentPage);
  }
  nextPage(self) {
    if (self.currentPage < self.totalPages) {
      self.currentPage = self.currentPage + 1;
      if (self.authenticatedUser.accountType == AccountType.ADMIN)
        self.getReviews(self.currentPage);
      else self.getReviewsBySeller(self.authenticatedUser.id, self.currentPage);
    }
  }
  previousPage(self) {
    if (self.currentPage > 0) {
      self.currentPage = self.currentPage - 1;
      if (self.authenticatedUser.accountType == AccountType.ADMIN)
        self.getReviews(self.currentPage);
      else self.getReviewsBySeller(self.authenticatedUser.id, self.currentPage);
    }
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }
  get authenticatedUser() {
    return this.authService.authenticatedUser as LoginToken;
  }

  ngOnInit(): void {
    if (this.authenticatedUser.accountType == AccountType.ADMIN)
      this.getReviews(0);
    else this.getReviewsBySeller(this.authenticatedUser.id, 0);
  }
}
