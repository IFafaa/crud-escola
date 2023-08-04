import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'escolas',
    loadChildren: () => import('./modules/school/school.module').then(m => m.SchoolModule)
  },
  {
    path: '',
    redirectTo: '/escolas',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/escolas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
