import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-page',
  imports: [CommonModule],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPageComponent {
  orderService = inject(OrderService);
  orders = signal<Order[]>([]);
  orderSelected = signal<Order>(new Order());

  ngOnInit(): void {
    this.listOrders();
  }

  listOrders() {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders.set(data);
      },
      error: (err) => {
        console.error('Error cargando productos:', err);
      }
    });
  }

  loadDetail(order: Order) {
    this.orderSelected.set(order);
  }
}
