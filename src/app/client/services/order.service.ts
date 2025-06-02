import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order.interface';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class OrderService {
    private http = inject(HttpClient);

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(`${baseUrl}/pedidos`);
    }

    createOrder(data: Order): Observable<object> {
        return this.http.post(`${baseUrl}/pedidos`, data);
    }
}
