import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth/layout/auth-layout/auth-layout.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';
import { AdminLayoutComponent } from './admin/layout/admin-layout/admin-layout.component';
import { CategoriesPageComponent } from './admin/pages/categories-page/categories-page.component';
import { ProductsPageComponent } from './admin/pages/products-page/products-page.component';
import { ClientLayoutComponent } from './client/layout/client-layout/client-layout.component';
import { ProductsPageComponent as ProductsClientPageComponent } from './client/pages/products-page/products-page.component';
import { CheckoutPageComponent } from './client/pages/checkout-page/checkout-page.component';
import { OrdersPageComponent } from './client/pages/orders-page/orders-page.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: () => [{
            path: '',
            component: AuthLayoutComponent,
            children: [
                {
                    path: '',
                    redirectTo: 'login',
                    pathMatch: 'full',
                },
                {
                    path: 'login',
                    component: LoginPageComponent,
                },
                {
                    path: 'register',
                    component: RegisterPageComponent,
                },
                {
                    path: '**',
                    redirectTo: '',
                },
            ],
        }],
    },
    {
        path: 'admin',
        loadChildren: () => [{
            path: '',
            component: AdminLayoutComponent,
            children: [
                {
                    path: '',
                    redirectTo: 'categories',
                    pathMatch: 'full',
                },
                {
                    path: 'categories',
                    component: CategoriesPageComponent,
                },
                {
                    path: 'products',
                    component: ProductsPageComponent,
                },
                {
                    path: 'orders',
                    component: OrdersPageComponent,
                },
                {
                    path: '**',
                    redirectTo: '',
                },
            ],
        }],
    },
    {
        path: 'client',
        loadChildren: () => [{
            path: '',
            component: ClientLayoutComponent,
            children: [
                {
                    path: '',
                    redirectTo: 'products',
                    pathMatch: 'full',
                },
                {
                    path: 'products',
                    component: ProductsClientPageComponent,
                },
                {
                    path: 'checkout',
                    component: CheckoutPageComponent,
                },
                {
                    path: 'orders',
                    component: OrdersPageComponent,
                },
                {
                    path: '**',
                    redirectTo: '',
                },
            ],
        }],
    },
];

