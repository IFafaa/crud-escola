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
import { SchoolDetailsCapacityComponent } from './components/school-details-capacity/school-details-capacity.component';
import { SchoolDetailsClassesComponent } from './components/school-details-classes/school-details-classes.component';
import { Formatters } from 'src/app/core/helpers/formatters';
import { ClassAddComponent } from './components/class-add/class-add.component';
import { ClassDetailsComponent } from './pages/class-details/class-details.component';
import { ClassDetailsFormComponent } from './components/class-details-form/class-details-form.component';
import { ClassDetailsStudentsComponent } from './components/class-details-students/class-details-students.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { SchoolsFilterComponent } from './components/schools-filter/schools-filter.component';
import { Filters } from 'src/app/core/helpers/filters';
import { ClassFilterComponent } from './components/class-filter/class-filter.component';
import { StudentFilterComponent } from './components/student-filter/student-filter.component';
import { Export } from 'src/app/core/helpers/export';
import {MatPaginatorModule} from '@angular/material/paginator';

const routes: Routes = [
  {
    path: '',
    component: SchoolListComponent,
  },
  {
    path: ':id/:method',
    component: SchoolDetailsComponent,
  },
  {
    path: 'classe/:id/:method/:classId/:classMethod',
    component: ClassDetailsComponent,
  },
];

@NgModule({
  declarations: [
    SchoolListComponent,
    SchoolAddComponent,
    SchoolDetailsComponent,
    SchoolDetailsFormComponent,
    SchoolDetailsAddressComponent,
    SchoolDetailsCapacityComponent,
    SchoolDetailsClassesComponent,
    ClassAddComponent,
    ClassDetailsComponent,
    ClassDetailsFormComponent,
    ClassDetailsStudentsComponent,
    StudentFormComponent,
    SchoolsFilterComponent,
    ClassFilterComponent,
    StudentFilterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forChild(),
    MatPaginatorModule
  ],
  providers: [Formatters, Filters, Export],
})
export class SchoolModule {}
