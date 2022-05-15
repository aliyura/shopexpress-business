import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  visitors: number = 0;
  sales: number = 0;
  products:number= 0;

  constructor() { }

  ngOnInit(): void {

    this.visitors = Math.floor(100 + Math.random() * 900);
    this.sales = Math.floor(10 + Math.random() * 50);
    this.products = Math.floor(1 + Math.random() * 10);
  }

}
