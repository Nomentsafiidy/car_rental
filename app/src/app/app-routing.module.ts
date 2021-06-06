import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'rent',
        loadChildren: () => import('./pages/rent/rent.module').then((m) => m.RentPageModule),
    },
    {
        path: 'car',
        loadChildren: () => import('./pages/car/car.module').then((m) => m.CarPageModule),
    },
    {
        path: 'renter',
        loadChildren: () => import('./pages/renter/renter.module').then((m) => m.RenterPageModule),
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardPageModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
