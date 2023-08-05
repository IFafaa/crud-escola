import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultButtonComponent } from './layout/default-button/default-button.component';
import { PaginacaoDirective } from './directives/pagination.directive';

@NgModule({
  declarations: [
    DefaultButtonComponent,
    PaginacaoDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DefaultButtonComponent,
    PaginacaoDirective
  ]
})
export class SharedModule { }
