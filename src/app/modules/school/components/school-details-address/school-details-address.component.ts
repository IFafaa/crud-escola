import { Component, Input, OnInit } from '@angular/core';
import { ISchool } from '../../models/school.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CepService } from 'src/app/core/services/cep.service';

@Component({
  selector: 'app-school-details-address',
  templateUrl: './school-details-address.component.html',
  styleUrls: ['./school-details-address.component.scss'],
})
export class SchoolDetailsAddressComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() isReadOnlyMode!: boolean;
  @Input() isEditMode!: boolean;

  constructor(private readonly _cepService: CepService) {
    // TO TEST
    if (!this.form) {
      this.form = new FormGroup({
        number: new FormControl(null),
        cep: new FormControl(null),
        street: new FormControl(null),
        neighborhood: new FormControl(null),
        city: new FormControl(null),
        state: new FormControl(null),
      });
    }
  }

  ngOnInit(): void {
    this.getCep(this.form.get('cep')?.value);
  }

  getCep(cep: string): void {
    if (!cep || typeof cep !== 'string' || cep.length < 8) return;
    let control = this.form.get('cep');
    control?.setErrors(null);
    this._cepService.getCep(cep).subscribe({
      next: (res) => {
        if (res.erro) {
          let error = { invalidCep: true };
          control?.setErrors(error);
          return;
        }
        this.setLocation(res);
      },
    });
  }

  setLocation(location: any): void {
    this.form.patchValue({
      street: location.logradouro,
      neighborhood: location.bairro,
      city: location.localidade,
      state: location.uf,
    });
  }
}
