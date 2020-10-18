import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products;
  searchUpdate;
  elementAddedToCart = false;
  constructor(private appservice: AppService, private router: Router) {
    this.searchUpdate = appservice.searchStarted;
    appservice.productChanged.subscribe((value) => {
      this.searchUpdate = value;
      if (this.searchUpdate) {
        this.products = this.appservice.getAllProducts();
      }
    })
  }

  ngOnInit(): void {
    this.products = this.appservice.getAllProducts();
  }

  addingToCart(product) {
    product.quantity += 1;
    this.appservice.addToCart(product);
    let cartitems = this.appservice.getItem();
    cartitems = cartitems.filter(function (el, index, array) {
      return array.indexOf(el) === index;
    });
    this.appservice.updateCart(cartitems);
    this.appservice.order();
    this.elementAddedToCart = true;
    setTimeout(() => {
      this.elementAddedToCart = false;
    }, 2000);
  }

  buyItem(product) {
    product.quantity = 1;
    this.appservice.clearBuyItem();
    this.appservice.addToBuyList(product);
    this.router.navigate(['buy']);
  }
}
