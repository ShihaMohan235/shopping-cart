import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, of } from 'rxjs';
import { products } from './product';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  cartitems = [];
  purchaseitems = [];
  productList = [];
  searchStarted: boolean;
  productChanged = new Subject<boolean>();
  ordersChanged = new Subject<any>();

  constructor(private http: HttpClient) {
    this.searchStarted = false;
  }

  getAllProducts() {
    let self = this;
    if (!this.searchStarted) {
      self.productList = products;
    }
    return this.productList;
  }

  addToCart(prod) {
    this.cartitems.push(prod);
  }

  getItem() {
    return this.cartitems;
  }

  updateCart(prodList) {
    this.cartitems = [];
    this.cartitems = prodList;
    return this.cartitems;
  }

  clearCart() {
    this.cartitems = [];
    return this.cartitems;
  }

  order() {
    this.ordersChanged.next(this.cartitems);
  }

  addToBuyList(prod) {
    this.purchaseitems.push(prod);
  }

  clearBuyItem() {
    this.purchaseitems = [];
    return this.purchaseitems;
  }

  getBuyList() {
    return this.purchaseitems;
  }

  filterResult(filtereditem) {
    this.productList = [];
    this.productList = filtereditem;
    this.searchStarted = true;
    this.productChanged.next(this.searchStarted);
  }
}
