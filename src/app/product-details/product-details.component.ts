import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { products } from '../product';
import { AppService } from '../app.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productdetails;
  id;
  elementAddedToCart = false;
  constructor(private activatedroute: ActivatedRoute, private appservice: AppService, private router: Router) { }

  ngOnInit(): void {

    this.activatedroute.paramMap.subscribe(params => {
      this.id = params.get('productId')
      for (let i = 0; i < products.length; i++) {
        if (this.id === products[i].id) {
          this.productdetails = products[i]
        }
      }
    });
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

  AddingToBuy(product) {
    product.quantity = 1;
    this.appservice.clearBuyItem();
    this.appservice.addToBuyList(product);
    this.router.navigate(['buy']);
  }
}
