import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-total-carrito-component',
  imports: [CommonModule,RouterLink],
  templateUrl: './total-carrito-component.component.html',
  styleUrl: './total-carrito-component.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalCarritoComponentComponent {
  cartService = inject(CartService);

  totalToPay$ = this.cartService.totalToPay$;
  totalProducts$ = this.cartService.totalProducts$;
}
