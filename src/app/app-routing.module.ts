import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from './layout/full/full.component';


/**
 * Spremenljivka Routes prikazuje vse mozne URL-je ki jih strežnik sprejema.
 * 
 * V tem primeru gre katerikoli url preko komponente FULL ter ga forwerdira nato na /dashboard. Kjer se nahaja naša aplikacija (čarovnik).
 */


const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
