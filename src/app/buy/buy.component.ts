import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {
  shopItems;
  priceDetailsArray = [];
  emptyShopList = true;
  totalPrice = 0;
  orderPlaceNotification = false;
  orderPlaced = false;

  constructor(private appservice: AppService) { }

  ngOnInit(): void {
    let self = this;
    this.shopItems = this.appservice.getBuyList();
    this.shopItems.map((item) => {
      self.priceDetailsArray.push({
        'id': item.id,
        'price': item.price,
        'quantity': item.quantity
      });
      self.totalPrice += item.price * item.quantity;
    });
    if (this.priceDetailsArray.length) {
      this.emptyShopList = false;
    }
  }

  submitForm(form) {
    if (form.value) {
      this.orderPlaceNotification = true;
      setTimeout(() => {
        form.reset()
        this.orderPlaceNotification = false;
        this.emptyShopList = true;
        this.orderPlaced = true;
      }, 3000);
    }
  }
}
