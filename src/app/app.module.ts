import { HeaderComponent } from './core/components/header/header.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SpinnerInterceptor } from './core/interceptors/spinner.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginationIntl } from './shared/config/custom.paginator.intl';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    HttpClientModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    HeaderComponent,
    MatSelectModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: MatPaginatorIntl,
      useValue: new CustomPaginationIntl().getCustomPaginationIntl(),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
