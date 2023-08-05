import { SchoolListComponent } from './pages/school-list/school-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SchoolFormComponent } from './components/school-form/school-form.component';
import { MatSelectModule } from '@angular/material/select';
import { SchoolAddComponent } from './components/school-add/school-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

const routes: Routes = [
  {
    path: '',
    component: SchoolListComponent,
  },
];

@NgModule({
  declarations: [SchoolListComponent, SchoolFormComponent, SchoolAddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forChild()
  ],
})
export class SchoolModule {}
