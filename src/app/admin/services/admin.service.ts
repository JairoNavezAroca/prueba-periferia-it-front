import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category.interface';
import { Product } from '../interfaces/product.interface';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class AdminService {
    private http = inject(HttpClient);

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${baseUrl}/categorias`);
    }

    createCategory(data: Category): Observable<object> {
        return this.http.post(`${baseUrl}/categorias`, data);
    }

    updateCategory(data: Category): Observable<object> {
        return this.http.put(`${baseUrl}/categorias/${data.id}`, data);
    }

    deleteCategory(data: Category): Observable<object> {
        return this.http.delete(`${baseUrl}/categorias/${data.id}`);
    }

    

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${baseUrl}/productos`);
    }

    createProduct(data: Product): Observable<object> {
        return this.http.post(`${baseUrl}/productos`, data);
    }

    updateProduct(data: Product): Observable<object> {
        return this.http.put(`${baseUrl}/productos/${data.id}`, data);
    }

    deleteProduct(data: Product): Observable<object> {
        return this.http.delete(`${baseUrl}/productos/${data.id}`);
    }
}
