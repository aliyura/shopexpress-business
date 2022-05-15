import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  status: number = 0;
  message: string = "Transaction Failed";
  redirect: string;
  redirectName: string = "Okay";

  constructor(
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.status = parseInt(this.route.snapshot.paramMap.get('id'));
    this.message = this.route.snapshot.queryParams['message']
    this.redirect = this.route.snapshot.queryParams['redirect'];
    this.redirectName = this.route.snapshot.queryParams['name'];

    if (this.redirect != null)
      this.redirect = "/" + this.redirect.replace(/\./g, "/");
    
  }

}
