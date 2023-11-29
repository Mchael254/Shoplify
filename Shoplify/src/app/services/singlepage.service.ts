import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SinglepageService {

  constructor() { }

  private cartItems: any[] = [];

  getCartItems(): any[] {
    return this.cartItems;
  }

  setCartItems(items: any[]): void {
    this.cartItems = items;
  }
}
