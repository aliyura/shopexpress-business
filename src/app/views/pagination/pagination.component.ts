import { AppCluster } from './../../app.shared.cluster';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() self: any
  @Input() totalPages: number
  @Input() currentPage: number
  @Input() change: (self, index: number) => void;

  constructor(public app: AppCluster) {
    !this.totalPages ? 0 : this.totalPages;
    !this.currentPage ? 0 : this.currentPage
  }

  changeI(self, event){
    this.change(self,event.target.value)
  }
  ngOnInit(): void {
  }
}
