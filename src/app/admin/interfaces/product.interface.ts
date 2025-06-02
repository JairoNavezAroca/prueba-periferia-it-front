import { Category } from "./category.interface";

export interface IProduct {
    id: number;
    categoria_id: number;
    nombre: string;
    descripcion: string;
    stock: number;
    precio: number;
    imagen_url: string;
    categoria: Category;

    imagen_b64: string;

    cantidad: number;
    flag_agregado_carrito: boolean;
}

export class Product implements IProduct {
    id: number = 0;
    categoria_id: number = 0;
    nombre: string = '';
    descripcion: string = '';
    stock: number = 0;
    precio: number = 0;
    imagen_url: string = '';
    categoria: Category = new Category;

    imagen_b64: string = '';

    cantidad: number = 0;
    flag_agregado_carrito: boolean = false;
}
