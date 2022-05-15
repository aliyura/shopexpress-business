import { CardService } from './../../services/card.service';
import { Card } from './../../models/card.model';
import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/types/list.type';
import { DialogHandlerService } from 'src/app/services/dialog-handler.service';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Status } from 'src/app/enum/status.enum';

@Component({
  selector: 'app-voucher-cards',
  templateUrl: './voucher-cards.component.html',
  styleUrls: ['./voucher-cards.component.css'],
})
export class VoucherCardsComponent implements OnInit {
  cards: List<Card>;
  currentPage: number = 0;
  totalPages: number = 0;
  isLoading: boolean = true;

  constructor(
    private dialogHandler: DialogHandlerService,
    private cardService: CardService
  ) {}

  private getVouchers(page: number) {
    this.currentPage = page;
    this.isLoading = true;
    this.cardService.getVouchers(page).subscribe(
      (response: ApiResponse) => {
        this.isLoading = false;
        if (response.success) {
          this.cards = response.payload['content'];
          this.totalPages = response.payload['totalPages'];
        }
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  deleteCard(card: Card) {
    this.dialogHandler.requestConfirmation(
      'Delete User',
      'Are you sure you want to delete card ' + card.serialNumber + '?',
      (yes) => {
        if (yes) {
          this.cardService.deleteCardById(card.id).subscribe(
            (response: ApiResponse) => {
              if (response.success) this.getVouchers(this.currentPage);
            },
            (err) => console.log(err)
          );
        }
      }
    );
  }

  changeCardStatus(e, card: Card) {
    var status = Status.AC;
    if (e.target.checked) status = Status.AC;
    else status = Status.IA;

    this.cardService.updateCardStatus(status, card.id).subscribe(
      (response: ApiResponse) => {
        if (!response.success) e.target.checked = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  changePage(self, page) {
    self.currentPage = page;
    self.getVouchers(self.currentPage);
  }
  nextPage(self) {
    if (self.currentPage < self.totalPages) {
      self.currentPage = self.currentPage + 1;
      self.getVouchers(self.currentPage);
    }
  }
  previousPage(self) {
    if (self.currentPage > 0) {
      self.currentPage = self.currentPage - 1;
      self.getVouchers(self.currentPage);
    }
  }

  ngOnInit(): void {
    this.getVouchers(0);
  }
}
