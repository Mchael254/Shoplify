import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  constructor(private adminService:AdminService,private router:Router) { }
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTearm: string = '';

  //cart
  cartItemCount: number = 0;



 productClick(product:any){
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  console.log(isLoggedIn);

  if (isLoggedIn === 'true') {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    this.router.navigate(['/single']);
  } else {
    this.router.navigate(['/signin']);
  }

 }


  fetchProducts() {
    this.adminService.fetchProducts().subscribe((products: any) => {
      this.products = products;

      // this.updateCounts();

      this.filteredProducts = [...this.products];

      // this.filterProducts();

      console.log(products);
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter((product) =>
      product.productName.toLowerCase().includes(this.searchTearm.toLowerCase()));
  }

  ngOnInit(): void {
    this.fetchProducts();

  }

}
