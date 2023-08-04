import { SchoolListComponent } from './pages/school-list/school-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolRegisterComponent } from './pages/school-register/school-register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { SchoolFormComponent } from './components/school-form/school-form.component';
import {MatSelectModule} from '@angular/material/select';



const routes: Routes = [
  {
    path: '', component: SchoolListComponent
  },
  {
    path: 'cadastrar', component: SchoolRegisterComponent
  }
]

@NgModule({
  declarations: [
    SchoolListComponent,
    SchoolRegisterComponent,
    SchoolFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
})
export class SchoolModule {}
