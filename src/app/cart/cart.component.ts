import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { products } from '../product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems;
  priceDetailsArray = [];
  emptyCart = true;
  totalPrice = 0;
  itemQuantity = {
  };
  constructor(private appservice: AppService, private router: Router) { }

  ngOnInit(): void {
    this.getCartItem();
  }

  getCartItem() {
    let self = this;
    this.cartItems = this.appservice.getItem();
    this.priceDetailsArray = [];
    this.cartItems = this.cartItems.filter(function (el, index, array) {
      return array.indexOf(el) === index;
    });
    this.cartItems.map((item) => {
      this.priceDetailsArray.push({
        'id': item.id,
        'price': item.price,
        'quantity': item.quantity
      })
      self.totalPrice += item.price * item.quantity;
    })
    if (this.priceDetailsArray.length) {
      this.emptyCart = false;
    }
  }

  incrementQuantityFromCart(id, number) {
    let self = this;
    let count = 0;
    this.cartItems.map((item, i) => {
      if (item.id === id) {
        item.quantity = number + 1;
        count += 1;
        this.priceDetailsArray.map(function (item) {
          if (item.id === id) {
            item.quantity = number + 1;
          }
        });
        self.totalPrice += item.price;
      }
    })
    this.appservice.updateCart(this.cartItems);
    this.appservice.order();
  }

  decrementQuantityFromCart(id, number) {
    let self = this;
    let count = 0;
    this.cartItems.map((item, i) => {
      if (item.id === id && number > 1) {
        item.quantity = number - 1;
        count += 1;
        this.priceDetailsArray.map(function (item) {
          if (item.id === id) {
            item.quantity = number - 1;
          }
        });
        self.totalPrice -= item.price;
      }
    })
    this.appservice.updateCart(this.cartItems);
    this.appservice.order();
  }

  clearCart() {
    this.appservice.clearCart();
    this.getCartItem();
    this.emptyCart = true;
    this.appservice.order();
  }

  buyItemFromCart() {
    let self = this;
    this.appservice.clearBuyItem();
    this.cartItems.forEach(element => {
      self.appservice.addToBuyList(element);
    });
    this.clearCart();
    this.router.navigate(['buy']);
  }

  removeItemFromCart(product) {
    let self = this;
    var index = this.cartItems.indexOf(product);
    if (index > -1) {
      this.cartItems[index].quantity = 0;
      this.cartItems.splice(index, 1);
    }
    this.totalPrice = 0;
    this.priceDetailsArray = [];
    this.cartItems.map((item, i) => {
      self.priceDetailsArray.push({
        'id': item.id,
        'price': item.price,
        'quantity': item.quantity
      });
      self.totalPrice += item.price * item.quantity;
    });
    if (this.priceDetailsArray.length) {
      this.emptyCart = false;
    } else {
      this.clearCart();
    }
    this.appservice.updateCart(this.cartItems);
    this.appservice.order();
  }
}
