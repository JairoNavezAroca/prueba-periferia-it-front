import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../../admin/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Order } from '../../interfaces/order.interface';
import { OrderDetail } from '../../interfaces/order-detail.interface';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  imports: [CommonModule],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutPageComponent {
  cartService = inject(CartService);
  authService = inject(AuthService);
  orderService = inject(OrderService);
  router = inject(Router);
  products = signal<Product[]>([]);
  user = signal<User | null>(new User());
  totalToPay$ = this.cartService.totalToPay$;

  ngOnInit(): void {
    this.products.set(this.cartService.getProducts());
    this.user.set(this.authService.getUser());
  }

  deleteAll() {
    this.products().forEach(x => this.cartService.deleteProduct(x));
    this.products.set(this.cartService.getProducts());
  }

  async generateOrder() {
    const totalToPay = await firstValueFrom(this.totalToPay$);
    const order: Order = new Order()
    order.users_id = this.user()?.id ?? 0;
    order.usuario_nombre = this.user()?.name ?? '';
    order.usuario_email = this.user()?.email ?? '';
    order.total_pagar = totalToPay;
    order.order_detail = [];
    this.products().forEach(x => {
      const detail: OrderDetail = new OrderDetail;
      detail.producto_id = x.id;
      detail.categoria_nombre = x.categoria.nombre;
      detail.producto_nombre = x.nombre;
      detail.precio_unitario = x.precio;
      detail.cantidad = x.cantidad;
      detail.precio_total = x.precio * x.cantidad;
      console.log(detail.precio_total)
      order.order_detail.push(detail);
    });

    Swal.fire({
      title: "¿Está seguro que desea realizar el pedido?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.createOrder(order).subscribe({
          next: _ => {
            Swal.fire("", "Se ha registrado exitosamente", "success");
            this.deleteAll();
            this.router.navigateByUrl('/client/orders');
          },
          error: (err) => {
            console.error('Error al registrar el pedido:', err);
            Swal.fire("", "Hubo un error al registrar, intente nuevamente", "error");
          }
        });
      }
    });
  }
}
