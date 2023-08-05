import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  private readonly swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
      actions: 'justify-content-center',
    },
    buttonsStyling: false
  })

  constructor() { }


  confirm(
    title:string,
    description:string,
    accept: Function,
    confirmButtonText?: string,
    cancelButtonText?: string,

    ){
    this.swalWithBootstrapButtons.fire({
      title: title,
      text: description,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmButtonText || 'Confirmar',
      cancelButtonText: cancelButtonText || 'Cancelar',
      reverseButtons: false,
      preConfirm: () => {
        return new Promise((resolve) =>{
          resolve(accept())
        })
      }
    });
    const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
    confirmButton.style.marginRight = '2rem';
  }

}
