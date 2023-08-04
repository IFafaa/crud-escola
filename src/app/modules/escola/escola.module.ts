import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscolaListComponent } from './pages/escola-list/escola-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '', component: EscolaListComponent
  }
]

@NgModule({
  declarations: [
    EscolaListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
})
export class EscolaModule {}
