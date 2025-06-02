import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class clientGuard implements CanActivate {
  authService = inject(AuthService);
  router = inject(Router);

  canActivate(): boolean {
    const user = this.authService.getUser();
    if (user == null || user.id == 0) {
      this.router.navigate(['/auth']);
      return false;
    }
    if (user.flag_admin) {
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }
}