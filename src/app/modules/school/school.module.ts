import { SchoolListComponent } from './pages/school-list/school-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SchoolAddComponent } from './components/school-add/school-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SchoolDetailsComponent } from './pages/school-details/school-details.component';
import { SchoolDetailsFormComponent } from './components/school-details-form/school-details-form.component';
import { SchoolDetailsAddressComponent } from './components/school-details-address/school-details-address.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolListComponent,
  },
  {
    path: ':id/:method',
    component: SchoolDetailsComponent,
  },

];

@NgModule({
  declarations: [SchoolListComponent, SchoolAddComponent, SchoolDetailsComponent, SchoolDetailsFormComponent, SchoolDetailsAddressComponent],
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
