import { OrderDetail } from "./order-detail.interface";

export interface IOrder {
    id: number;
    users_id: number;
    fecha: string;
    usuario_nombre: string;
    usuario_email: string;
    total_pagar: number;
    estado: number;
    order_detail: OrderDetail[];
}

export class Order implements IOrder {
    id: number = 0;
    users_id: number = 0;
    fecha: string = '';
    usuario_nombre: string = '';
    usuario_email: string = '';
    total_pagar: number = 0;
    estado: number = 0;
    order_detail: OrderDetail[] = [];
}
