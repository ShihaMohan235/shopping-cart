import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from '../app.service';
import { products } from '../product';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() searchcriteria = new EventEmitter();
  cartItemsCount;
  products = products;
  constructor(private appservice: AppService) {
  }

  ngOnInit(): void {
    this.appservice.ordersChanged.subscribe(items => this.cartItemsCount = items.length);
  }

  findProduct(searchContent) {
    let self = this;
    let filteredItems = products.filter(function (item) {
      return item.name.toLowerCase().includes(searchContent.toLowerCase());
    });
    this.appservice.filterResult(filteredItems);
  }
}
