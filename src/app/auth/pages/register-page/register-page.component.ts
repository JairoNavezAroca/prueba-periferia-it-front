import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  authService = inject(AuthService);
  private fb = inject(FormBuilder);
  formUtils = FormUtils;
  router = inject(Router);

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.min(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  registerUser() {
    this.authService.registerUser(this.myForm.value.name, this.myForm.value.email, this.myForm.value.password)
      .subscribe({
        next: response => {
          console.log("response: ", response)
          Swal.fire({
            title: "Exito",
            text: "Usuario registrado correctamente",
            icon: "success"
          });
          this.router.navigateByUrl('/auth');
        },
        error: error => {
          console.log("error:", error);
          Swal.fire({
            title: "Alerta",
            text: "Hubo un error al registrar el usuario, probablemente el correo ya está registrado",
            icon: "error"
          });
        }
      });
  }
}
