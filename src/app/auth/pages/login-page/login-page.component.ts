import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormUtils } from '../../../utils/form-utils';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  authService = inject(AuthService);
  private fb = inject(FormBuilder);
  formUtils = FormUtils;
  router = inject(Router);

  myForm: FormGroup = this.fb.group({
    email: ['cliente@example.com', [Validators.required, Validators.email]],
    password: ['abc123', [Validators.required]],
  });

  ngOnInit(): void {
    this.authService.logout();
  }

  login() {
    this.authService.login(this.myForm.value.email, this.myForm.value.password)
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          if (this.authService.isAdmin()) {
            this.router.navigateByUrl('/admin');
          }
          else {
            this.router.navigateByUrl('/client');
          }
        }
        else {
          Swal.fire({
            title: "Alerta",
            text: "Usuario o contraseña incorrecto",
            icon: "error"
          });

        }
      });
  }
}
