import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AdminService } from '../../../admin/services/admin.service';
import { Product } from '../../../admin/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { TotalCarritoComponentComponent } from '../../components/total-carrito-component/total-carrito-component.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-page',
  imports: [CommonModule, TotalCarritoComponentComponent, FormsModule],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPageComponent {
  adminService = inject(AdminService);
  cartService = inject(CartService);
  products = signal<Product[]>([]);

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    this.adminService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.products().forEach(item => {
          const productInCart = this.cartService.getProducts().find(x => x.id == item.id);
          if (productInCart) {
            item.cantidad = productInCart.cantidad;
            item.flag_agregado_carrito = productInCart.flag_agregado_carrito;
          }
        });
      },
      error: (err) => {
        console.error('Error cargando categorías:', err);
      }
    });
  }

  addToCart(product: Product) {
    product.flag_agregado_carrito = true;
    product.cantidad = 1;
    this.cartService.addToCart(product);
  }

  updateProductFromCart(product: Product) {
    this.cartService.deleteProduct(product);
    this.cartService.addToCart(product);
  }

  deleteFromCart(product: Product) {
    product.flag_agregado_carrito = false;
    this.cartService.deleteProduct(product);
  }

}
