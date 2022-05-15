import { AppCluster } from 'src/app/app.shared.cluster';
import { ActivatedRoute } from '@angular/router';
import { Order } from './../../models/order.model';
import { OrderDetails } from './../../models/order-details.model';
import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/types/list.type';
import { DialogHandlerService } from 'src/app/services/dialog-handler.service';
import { OrderService } from 'src/app/services/order.service';
import { ApiResponse } from 'src/app/models/api-response.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  order: Order;
  orderDetails: List<OrderDetails>;
  currentPage: number = 0;
  totalPages: number = 0;
  statusActions: Array<string> = ['IA', 'PV', 'PC', 'DP', 'PP', 'DV'];
  isOderLoading: boolean = true;
  isOrderDetailsLoading: boolean = true;

  constructor(
    public app: AppCluster,
    private route: ActivatedRoute,
    private dialogHandler: DialogHandlerService,
    private orderService: OrderService
  ) {}

  error(e) {
    e.target.src = '/assets/images/notfound.png';
  }

  private getOrder(orderId: number) {
    this.isOderLoading = true;
    this.orderService.getOrderByOrderId(orderId).subscribe(
      (response: ApiResponse) => {
        this.isOderLoading = false;
        if (response.success) {
          this.order = response.payload;
          console.log(this.order);
        }
      },
      (err) => {
        this.isOderLoading = false;
        console.log(err);
      }
    );
  }
  private getOrderDetails(orderId: number) {
    console.log('Loading details....');
    this.isOrderDetailsLoading = true;
    this.orderService.getOrderDetailsByOrderId(orderId).subscribe(
      (response: ApiResponse) => {
        this.isOrderDetailsLoading = false;
        console.log(response);
        if (response.success) {
          this.orderDetails = response.payload;
        }
      },
      (err) => {
        this.isOrderDetailsLoading = false;
        console.log(err);
      }
    );
  }

  deleteOrder(order: Order) {
    this.dialogHandler.requestConfirmation(
      'Delete User',
      'Are you sure you want to delete this order?',
      (yes) => {
        if (yes) {
          this.orderService.deleteOrderById(order.id).subscribe(
            (response: ApiResponse) => {
              if (response.success) {
                this.getOrder(order.id);
                this.getOrderDetails(order.id);
              }
            },
            (err) => console.log(err)
          );
        }
      }
    );
  }

  changeOrderStatus(e, order: Order) {
    var status = e.target.value;
    this.orderService.updateOrderStatus(status, order.id).subscribe(
      (response: ApiResponse) => {
        if (!response.success) {
          this.getOrderDetails(order.id);
          this.getOrder(order.id);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    this.getOrder(parseInt(id));
    this.getOrderDetails(parseInt(id));
  }
}

