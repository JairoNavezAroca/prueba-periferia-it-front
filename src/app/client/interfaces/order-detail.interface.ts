import { Product } from "../../admin/interfaces/product.interface";

export interface IOrderDetail {
    id: number;
    pedido_id: number;
    producto_id: number;
    categoria_nombre: string;
    producto_nombre: string;
    precio_unitario: number;
    cantidad: number;
    precio_total: number;
    producto: Product;
}

export class OrderDetail implements IOrderDetail {
    id: number = 0;
    pedido_id: number = 0;
    producto_id: number = 0;
    categoria_nombre: string = '';
    producto_nombre: string = '';
    precio_unitario: number = 0;
    cantidad: number = 0;
    precio_total: number = 0;
    producto: Product = new Product();
}
