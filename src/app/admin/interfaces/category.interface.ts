import { Product } from "./product.interface";

export interface ICategory {
  id: number;
  nombre: string;
  email: string;
  productos: Product[];
}

export class Category implements ICategory {
  id: number = 0;
  nombre: string = '';
  email: string = '';
  productos: Product[] = [];
}
