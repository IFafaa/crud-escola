import { Component, Input, OnInit } from '@angular/core';
import { ISchool } from '../../models/school.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CepService } from 'src/app/core/services/cep.service';

@Component({
  selector: 'app-school-details-address',
  templateUrl: './school-details-address.component.html',
  styleUrls: ['./school-details-address.component.scss'],
})
export class SchoolDetailsAddressComponent implements OnInit {
  @Input() form!: FormGroup
  @Input() isReadOnlyMode!: boolean;
  @Input() isEditMode!: boolean;


  address: string = '';
  constructor(
    private readonly _fb: FormBuilder,
    private readonly _cepService: CepService
    ) {}

  ngOnInit(): void {
  }

  getCep(cep: string): void {
    this.form.get('number')?.disable();
    this.form.get('number')?.setValue("");
    this.address = '';
    if (cep.length < 8) return;
    let control = this.form.get('cep');
    control?.setErrors(null);
    this._cepService.getCep(cep).subscribe({
      next: (res) => {
        if (res.erro) {
          let error = { invalidCep: true };
          control?.setErrors(error);
          return;
        }
        this.setLocation(res)
        this.setAddress();
      },
    });
  }

  setLocation(location: any): void{
    this.form.patchValue({
      street: location.logradouro,
      neighborhood: location.bairro,
      city: location.localidade,
      state: location.uf,
    });
  }

  setAddress(): void {
    this.form.get('number')?.enable();
    const formValue = this.form.value.location;
    this.address = `${formValue.state}, ${formValue.city} - ${
      formValue.neighborhood
    }, ${formValue.street}, ${formValue.number || ''}`;
  }
}
