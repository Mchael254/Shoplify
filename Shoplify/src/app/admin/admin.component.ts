import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { SinglepageService } from '../services/singlepage.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private http: HttpClient, private adminService: AdminService,
    private userService: UserService, private exploreService: SinglepageService) { }
  //projects
  products: any[] = [];
  filteredProducts: any[] = [];
  completedproductsCount: number = 0;
  ongoingproductsCount: number = 0;
  upcomingproductsCount: number = 0;
  allproductsCount: number = 0;
  searchTearm: string = '';

  userTickets: any[] = [];


  //forms
  showProductForm: boolean = false;
  showUpdateForm: boolean = false;
  showAcceptanceForm: boolean = false

  // projectForm types
  productForm: {
    productName: string;
    productDescription: string;
    productPrice: number;
    productCategory: string;
    productImage: string;
    supplierContact: string;
    Quantity: number;
  } = {
      productName: '',
      productDescription: '',
      productPrice: 0,
      productCategory: '',
      productImage: '',
      supplierContact: '',
      Quantity: 0,
    };


  //error/update responses
  errorResponse!: any
  mainError!: any
  updateResponse!: any
  productID!: any
  isCompleted: boolean = false
  isCompletedr: boolean = true
  isWhichError: boolean = false
  successResponse: string = ''
  successAssign: string = ''
  noneCompleted: boolean = false

  //authentication
  email: string = '';
  password: string = '';
  loginError: string = '';
  assignableEmployees: string[] = []

  productctID: any;

  //product management

  product() {
    this.productDashboard = true
    this.dashboard = false
    this.profileview = false
  }

  productCount: number = 0
  outOfStockCount: number = 0;
  inStockCount: number = 0;

  fetchProducts() {
    this.adminService.fetchProducts().subscribe((products: any) => {
      this.products = products;

      this.updateCounts();

      this.filteredProducts = [...this.products];

      this.filterProducts();

      // console.log(products);
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter((product) =>
      product.productName.toLowerCase().includes(this.searchTearm.toLowerCase()));
  }

  updateCounts() {
    this.productCount = this.products.length;
    this.outOfStockCount = this.products.filter(product => product.Quantity <= 5).length;
    this.inStockCount = this.products.filter(product => product.Quantity > 5).length;
  }


  //show add product form
  addProduct() {
    this.showProductForm = true;
    this.updateResponse = ''
    this.successAssign = ''
  }
  //close product form
  closeProduct() {
    this.showProductForm = false
  }


  //update product details
  productDetails(product: any) {
    this.productctID = product.productID;
    this.productForm = {
      
      productName: product.productName,
      productDescription: product.productDescription,
      productPrice: product.productPrice,
      productCategory: product.productCategory,
      supplierContact: product.supplierContact,
      productImage: product.productImage,
      Quantity: product.Quantity,

    };
    this.successResponse = ''
    this.updateResponse = ''
    this.showUpdateForm = true;
  }

  // Update project form
  updateProductForm() {
    const productDataUpdate = {
      productID: this.productctID,
      productName: this.productForm.productName,
      productDescription: this.productForm.productDescription,
      productPrice: this.productForm.productPrice,
      productCategory: this.productForm.productCategory,
      supplierContact: this.productForm.supplierContact,
      productImage: this.productForm.productImage,
      Quantity: this.productForm.Quantity,
    };
    // console.log(productDataUpdate);
    this.adminService.updateProduct(productDataUpdate).subscribe(
      (response: any) => {
        this.successResponse = 'product updated successfully'
        this.fetchProducts();
        setTimeout(() => {
          this.showUpdateForm = false;

        }, 3000);
        this.fetchProducts()
      },
      (error) => {
        if (error instanceof ErrorEvent) {
          // Client-side error
          this.updateResponse += ` Client-side error: ${error.message}`;
          setTimeout(() => {
            this.updateResponse = ''
          }, 3000);
        } else if (error instanceof HttpErrorResponse) {
          // Server-side error
          if (error.error && error.error.error) {
            this.updateResponse += `   ${error.statusText} - ${error.error.error}`;
            setTimeout(() => {
              this.updateResponse = ''
            }, 3000);
          } else {
            this.updateResponse += ` Server-side error: ${error.status} - ${error.statusText}`;
          }
        }

        console.error('Error updating project:', error);
      }
    );
  }

  //close the update product form
  closeUpdate() {
    this.showUpdateForm = false
  }

  // create product
  submitProductForm() {
    this.fetchProducts()
    const productData = {
      productName: this.productForm.productName,
      productDescription: this.productForm.productDescription,
      productPrice: this.productForm.productPrice,
      productCategory: this.productForm.productCategory,
      productImage: this.productForm.productImage,
      supplierContact: this.productForm.supplierContact,
      Quantity: this.productForm.Quantity,

    };
    // console.log(productData);

    this.adminService.createProduct(productData).subscribe(
      (response: any) => {
        this.fetchProducts()
        this.successAssign = 'product created successfully'
        setTimeout(() => {
          this.errorResponse = '';
          this.showProductForm = false;
        }, 2500);
      },
      (error) => {
        this.errorResponse = this.adminService.errorResponses();
        setTimeout(() => {
          this.errorResponse = ''

        }, 2500);
        this.updateResponse = this.adminService.updateResponses();

        console.error('Error updating project:', error);
      }
    );
  }

  deleteProduct() {
    const softDelete= {
      productID: this.productctID,
    };
    // console.log(softDelete);
    const productID = this.productctID; 
    this.adminService.deleteProduct(productID).subscribe(
      (response) => {
        console.log('User deleted successfully', response);
        this.deleteSuccesss = true
        this.deleteSuccess = 'product deleted successfully'
        this.showAcceptanceForm = false

      },
      (error) => {
        console.error('Error deleting user', error);
      }
    );

  }



  ngOnInit() {
    this.fetchProducts();



    //   //get admin  details
    //   const userEmail = localStorage.getItem('user_email');
    //   console.log(userEmail);
    //   if (userEmail) {
    //     this.userService.getUserDetails(userEmail).subscribe(
    //       (response) => {
    //         this.profiles = response.details
    //         // console.log(response);
    //         if (this.profiles && this.profiles.length > 0) {
    //           const userDetail = this.profiles[0];
    //           this.userName = userDetail.userName;
    //           this.email = userDetail.email;
    //           this.phone_no = userDetail.phone_no;
    //           // this.password = userDetail.password;
    //         }
    //       },
    //       (error) => {
    //         console.error('Error fetching user details:', error);
    //       }
    //     );

    //   }

    //   //get all users
    //   this.userService.getAllUsers().subscribe(
    //     (data: any) => {

    //       this.clients = data.users;
    //       this.filteredClients = this.clients.filter(client => client.role !== 'admin');
    //     },
    //     (error: any) => {
    //       console.error('Error fetching reviews:', error);
    //     }
    //   );

  }


  //complete product
  completeproduct() {
    this.showAcceptanceForm = true
  }


  closeAuth() {
    this.showAcceptanceForm = false
  }

  clearRegisterError(delay: number) {
    setTimeout(() => {
      this.loginError = '';
    }, delay);
  }

  search() {


  }


  //profile management

  dashboard: boolean = false
  reviews: any[] = [];
  sortedReviews: any[] = [];
  unsortedReviews: any[] = [];
  isReviewReceived: boolean = false;
  reviewDiv: boolean = false
  reviewss: any[] = [];
  profileview: boolean = false
  success: boolean = false;
  error: boolean = false
  userName: string = ''
  phone_no: string = ''
  confirm_password = ''
  successUpdate: string = ''
  updateError: string = ''
  otherReviewStatus: string = ''
  productDashboard: boolean = true


  profileManager() {
    this.productDashboard = false
    this.profileview = true
    this.dashboard = false

  }


  //update profile details
  updateSubmit() {
    if (this.password !== this.confirm_password || this.password.length < 8) {
      this.error = true
      this.updateError = 'password mismatch or less than 8'
      setTimeout(() => {
        this.updateError = '';
        this.error = false

      }, 3000);
      return;
    }
    const profileDataUpdate = {
      userName: this.userName,
      email: this.email,
      phone_no: this.phone_no,
      password: this.password,
    };

    // this.userService.updateProfile(profileDataUpdate).subscribe(
    //   (response) => {
    //     console.log('Profile updated successfully:', response);
    //     this.success = true
    //     this.successUpdate = 'profile changed successfully';
    //     setTimeout(() => {
    //       this.success = false
    //     }, 2500);
    //   },
    //   (error) => {
    //     console.error('Error updating profile:', error);
    //     this.error = true
    //     this.updateError = 'Failed to update profile. ';
    //     setTimeout(() => {
    //       this.error = false

    //     }, 2500);
    //   }
    // );
  }

  //clients management
  //delete user
  deleteSuccesss: boolean = false
  deleteSuccess: string = ''
  deletedUser() {

  }
  // deletesUser(email: string): void {
  //   this.showAcceptanceForm = true

  //   this.userService.deleteUser(email).subscribe(
  //     (response) => {
  //       console.log('User deleted successfully', response);
  //       this.refreshUserList();
  //       this.deleteSuccesss = true
  //       this.deleteSuccess = 'User deleted successfully'
  //       this.showAcceptanceForm = false

  //     },
  //     (error) => {
  //       console.error('Error deleting user', error);
  //     }
  //   );
  // }
  // refreshUserList(): void {
  //   this.userService.getAllUsers().subscribe(
  //     (data: any) => {
  //       this.clients = data.users;
  //       this.filteredClients = this.clients.filter(client => client.role !== 'admin');
  //     },
  //     (error: any) => {
  //       console.error('Error fetching reviews:', error);
  //     }
  //   );
  // }

  Clients() {
    this.dashboard = true
    this.productDashboard = false
    this.profileview = false

  }



}



