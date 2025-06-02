import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Category } from '../../interfaces/category.interface';
import Swal from 'sweetalert2';

type ActionType = 'Registrar Categoria' | 'Editar Categoria';

@Component({
  selector: 'app-categories-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesPageComponent {
  adminService = inject(AdminService);
  // categories: Category[] = [];
  categories = signal<Category[]>([]);
  categorySelected: Category = new Category();
  action = signal<ActionType>('Registrar Categoria');

  ngOnInit(): void {
    this.listCategories();
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

  closeModal() {
    const buttonOpenModal = document.getElementById('buttonCloseModal');
    buttonOpenModal?.click();
  }

  openNewCategory() {
    this.action.set("Registrar Categoria");
    this.categorySelected = new Category();
    const buttonOpenModal = document.getElementById('buttonOpenModal');
    buttonOpenModal?.click();
  }

  openEditCategory(categoria: any) {
    this.action.set("Editar Categoria");
    this.categorySelected = { ...categoria };
    const buttonOpenModal = document.getElementById('buttonOpenModal');
    buttonOpenModal?.click();
  }

  deleteCategory(categoria: any) {
    Swal.fire({
      title: "¿Está seguro que desea eliminar la categoría?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteCategory(categoria).subscribe({
          next: _ => {
            this.listCategories();
            this.closeModal();
            Swal.fire("", "Se ha eliminado exitosamente", "success");
          },
          error: (err) => {
            console.error('Error al eliminar categoría:', err);
            Swal.fire("", "Hubo un error al eliminar, intente nuevamente", "error");
          }
        });
      }
    });
  }

  saveChanges() {
    Swal.fire({
      title: "¿Está seguro que desea guardar los cambios?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.action() == "Registrar Categoria") {
          this.adminService.createCategory(this.categorySelected).subscribe({
            next: _ => {
              this.listCategories();
              this.closeModal();
              Swal.fire("", "Se ha registrado exitosamente", "success");
            },
            error: (err) => {
              console.error('Error al registrar categoría:', err);
              Swal.fire("", "Hubo un error al registrar, intente nuevamente", "error");
            }
          });
        }
        else {
          this.adminService.updateCategory(this.categorySelected).subscribe({
            next: _ => {
              this.listCategories();
              this.closeModal();
              Swal.fire("", "Se ha editado exitosamente", "success");
            },
            error: (err) => {
              console.error('Error al editar categoría:', err);
              Swal.fire("", "Hubo un error al editado, intente nuevamente", "error");
            }
          });
        }
      }
    });
  }
}
