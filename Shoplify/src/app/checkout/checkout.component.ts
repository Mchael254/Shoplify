import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(private router: Router,) { }

  emptyCart: boolean = false
  paymentOptions: boolean = false
  deletes: boolean = false

  //container
  container: boolean = true

  //cart items
  cartItems: any[] = [];
  cartItemCount: number = 0;
  total: number = 0;
  existingCartItems: any[] = [];
  showAcceptanceForm: boolean = false;
  totalAmount: number = 0;
  summary: boolean = false;


  checkout() {
  }

  //payment
  payment() {
    this.paymentOptions = true

  }

  //decline payment
  notYet() {
    this.paymentOptions = false
  }
  accept() { }
  // remove(){

  // }

  reduce(item: any) {
    if (item.quantity > 0) {
      item.quantity -= 1;
      this.updateLocalStorage();
      this.updateUICount();
      this.calculateTotal();
    }
  }
  add(item: any) {
    item.quantity += 1;
    this.updateLocalStorage();
    this.updateUICount();
    this.calculateTotal();
  }

  //remove item from cart
  remove(item: any) {
    this.showAcceptanceForm = true;
  }
  decline() {
    this.showAcceptanceForm = false;

  }
  continue(item: any) {
    setTimeout(() => {
      const index = this.existingCartItems.indexOf(item);
      this.existingCartItems.splice(index, 1);
      this.updateLocalStorage();
      this.updateUICount();
      this.calculateTotal();
      if (this.totalAmount == 0) {
        this.emptyCart = true
        this.summary = false
      }

    }, 2000);
    this.showAcceptanceForm = false;

  }



  ngOnInit() {
    this.existingCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.cartItemCount = this.existingCartItems.reduce((count: number, item: any) => count + item.quantity, 0);

    this.calculateTotal();
    this.checkTotal()
  }


  calculateTotal() {
    this.totalAmount = this.existingCartItems.reduce((total: number, item: any) => {
      return total + (item.productPrice * item.quantity);
    }, 0);

  }

  private updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.existingCartItems));
  }
  private updateUICount() {
    this.cartItemCount = this.existingCartItems.reduce((count: number, item: any) => count + item.quantity, 0);
  }

  private checkTotal(){
    if(this.totalAmount == 0){
      this.emptyCart = true
    }else{
      this.emptyCart = false
      this.summary = true
    }
  }



}
