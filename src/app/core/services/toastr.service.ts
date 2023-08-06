import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  private readonly toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  constructor() {}

  error(message: string): void {
    this.toast.fire({
      icon: 'error',
      title: message,
    });
  }

  attention(message: string): void {
    this.toast.fire({
      icon: 'warning',
      title: message,
    });
  }

  success(message: string): void {
    this.toast.fire({
      icon: 'success',
      title: message,
    });
  }
}
