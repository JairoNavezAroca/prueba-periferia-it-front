import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, numberAttribute, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Product } from '../../interfaces/product.interface';
import Swal from 'sweetalert2';
import { Category } from '../../interfaces/category.interface';

type ActionType = 'Registrar Producto' | 'Editar Producto';

@Component({
  selector: 'app-products-page',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPageComponent {
  adminService = inject(AdminService);
  // categories: Category[] = [];
  categories = signal<Category[]>([]);
  products = signal<Product[]>([]);
  productSelected: Product = new Product();
  action = signal<ActionType>('Registrar Producto');
  imagePreview = signal<string | ArrayBuffer | null>(null);

  ngOnInit(): void {
    this.listCategories();
    this.listProducts();
  }

  listCategories() {
    this.adminService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: (err) => {
        console.error('Error cargando categorías:', err);
      }
    });
  }

  listProducts() {
    this.adminService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (err) => {
        console.error('Error cargando productos:', err);
      }
    });
  }

  closeModal() {
    const buttonOpenModal = document.getElementById('buttonCloseModal');
    buttonOpenModal?.click();
  }

  openNewProduct() {
    this.action.set("Registrar Producto");
    this.productSelected = new Product();
    const buttonOpenModal = document.getElementById('buttonOpenModal');
    buttonOpenModal?.click();
  }

  openEditCategory(product: any) {
    this.action.set("Editar Producto");
    this.productSelected = { ...product };
    this.imagePreview.set(this.productSelected.imagen_url);
    const buttonOpenModal = document.getElementById('buttonOpenModal');
    buttonOpenModal?.click();
  }

  deleteCategory(product: any) {
    Swal.fire({
      title: "¿Está seguro que desea eliminar el producto?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteProduct(product).subscribe({
          next: _ => {
            this.listProducts();
            this.closeModal();
            Swal.fire("", "Se ha eliminado exitosamente", "success");
          },
          error: (err) => {
            console.error('Error al eliminar producto:', err);
            Swal.fire("", "Hubo un error al eliminar, intente nuevamente", "error");
          }
        });
      }
    });
  }

  saveChanges() {
    console.log('Guardar producto:', this.productSelected);
    this.productSelected.categoria_id = Number(this.productSelected.categoria_id);
    Swal.fire({
      title: "¿Está seguro que desea guardar los cambios?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.action() == "Registrar Producto") {
          this.adminService.createProduct(this.productSelected).subscribe({
            next: _ => {
              this.listProducts();
              this.closeModal();
              Swal.fire("", "Se ha registrado exitosamente", "success");
            },
            error: (err) => {
              console.error('Error al registrar producto:', err);
              Swal.fire("", "Hubo un error al registrar, intente nuevamente", "error");
            }
          });
        }
        else {
          this.adminService.updateProduct(this.productSelected).subscribe({
            next: _ => {
              this.listProducts();
              this.closeModal();
              Swal.fire("", "Se ha editado exitosamente", "success");
            },
            error: (err) => {
              console.error('Error al editar producto:', err);
              Swal.fire("", "Hubo un error al editado, intente nuevamente", "error");
            }
          });
        }
      }
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.set(reader.result);
        this.productSelected.imagen_b64 = (typeof reader.result === 'string') ? reader.result : '';
      };
      reader.readAsDataURL(file);
    }
  }
}
