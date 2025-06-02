// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../admin/interfaces/product.interface';

@Injectable({ providedIn: 'root' })
export class CartService {
    private products: Product[] = [];
    private totalSubject = new BehaviorSubject<number>(0);
    private totalProducts = new BehaviorSubject<number>(0);

    totalToPay$ = this.totalSubject.asObservable();
    totalProducts$ = this.totalProducts.asObservable();

    addToCart(product: Product) {
        this.products.push(product);
        this.updateTotal();
    }

    private updateTotal() {
        const totalToPay = this.products.reduce((acc, x) => acc + Number(x.precio) * x.cantidad, 0);
        this.totalSubject.next(totalToPay);
        const totalProducts = this.products.length;
        this.totalProducts.next(totalProducts);
    }

    getProducts(): Product[] {
        return [...this.products];
    }

    deleteProduct(product: Product) {
        this.products = this.products.filter(x => x.id != product.id);
        this.updateTotal();
    }
}
