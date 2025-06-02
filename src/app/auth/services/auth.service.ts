import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

// import { AuthResponse } from '@auth/interfaces/auth-response.interface';
// import { User } from '@auth/interfaces/user.interface';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { User } from '../interfaces/user.interface';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authStatus = signal<AuthStatus>('checking');
    private _user = signal<User | null>(null);
    private _token = signal<string | null>(localStorage.getItem('token'));

    private http = inject(HttpClient);

    // checkStatusResource = rxResource({
    //     loader: () => this.checkStatus(),
    // });

    authStatus = computed<AuthStatus>(() => {
        if (this._authStatus() === 'checking') return 'checking';

        if (this._user()) {
            return 'authenticated';
        }

        return 'not-authenticated';
    });

    user = computed(() => this._user());
    token = computed(this._token);
    isAdmin = computed(() => this._user()?.flag_admin);

    login(email: string, password: string): Observable<boolean> {
        return this.http
            .post<AuthResponse>(`${baseUrl}/login`, {
                email: email,
                password: password,
            })
            .pipe(
                map((resp) => this.handleAuthSuccess(resp)),
                catchError((error: any) => this.handleAuthError(error))
            );
    }

    // checkStatus(): Observable<boolean> {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         this.logout();
    //         return of(false);
    //     }

    //     return this.http
    //         .get<AuthResponse>(`${baseUrl}/auth/check-status`, {
    //             // headers: {
    //             //   Authorization: `Bearer ${token}`,
    //             // },
    //         })
    //         .pipe(
    //             map((resp) => this.handleAuthSuccess(resp)),
    //             catchError((error: any) => this.handleAuthError(error))
    //         );
    // }

    logout() {
        this._user.set(null);
        this._token.set(null);
        this._authStatus.set('not-authenticated');

        localStorage.removeItem('token');
        localStorage.removeItem('user-id');
        localStorage.removeItem('user-name');
        localStorage.removeItem('user-email');
        localStorage.removeItem('user-flag_admin');
    }

    private handleAuthSuccess({ token, user }: AuthResponse) {
        this._user.set(user);
        this._token.set(token);
        this._authStatus.set('authenticated');

        localStorage.setItem('token', token);
        localStorage.setItem('user-id', String(user.id));
        localStorage.setItem('user-name', user.name);
        localStorage.setItem('user-email', user.email);
        localStorage.setItem('user-flag_admin', user.flag_admin ? '1' : '0');

        return true;
    }

    private handleAuthError(error: any) {
        this.logout();
        return of(false);
    }

    registerUser(name: string, email: string, password: string): Observable<object> {
        return this.http
            .post(`${baseUrl}/register-user`, {
                name: name,
                email: email,
                password: password,
            });
    }

    getUser(): User {
        const user: User = {
            id: Number(localStorage.getItem('user-id')),
            name: localStorage.getItem('user-name') ?? '',
            email: localStorage.getItem('user-email') ?? '',
            flag_admin: localStorage.getItem('user-id') == '1'
        }
        return user;
    }

    getJWT(): string {
        return localStorage.getItem('token') ?? '';
    }
}
