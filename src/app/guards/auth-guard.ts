import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  authService = inject(AuthService);
  router = inject(Router);

  canActivate(): boolean {
    const user = this.authService.getUser();
    if (user == null || user.id == 0) {
      return true;
    }

    if (user.flag_admin) {
      this.router.navigate(['/admin']);
    }
    else {
      this.router.navigate(['/client']);
    }
    console.log('user.flag_admin', user.flag_admin);
    return true;
  }
}