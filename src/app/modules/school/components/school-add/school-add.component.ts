import { Component } from '@angular/core';
import { ISelect } from '../../models/select.model';
import { SchoolService } from '../../services/school.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CepService } from 'src/app/core/services/cep.service';
import { ISchool } from '../../models/school.model';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { cpfCnpjValidator } from 'src/app/shared/validators/cpfCnpj.validator';

@Component({
  selector: 'app-school-add',
  templateUrl: './school-add.component.html',
  styleUrls: ['./school-add.component.scss'],
})
export class SchoolAddComponent {
  typeInstitution: ISelect[] = [];
  typeTeaching: ISelect[] = [];
  typeOpeningHours: ISelect[] = [];

  form!: FormGroup;

  address: string = '';

  constructor(
    private readonly _schoolService: SchoolService,
    private readonly _fb: FormBuilder,
    private readonly _cepService: CepService,
    private readonly _ref: MatDialogRef<SchoolAddComponent>,
    private readonly _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTypeInstitution();
    this.getTypeTeaching();
    this.getTypeOpeningHours();
    this.createForm();
  }

  createForm() {
    this.form = this._fb.group({
      name: [
        { value: null, disabled: false },
        [Validators.required, Validators.pattern(/^[\p{L}\s]+$/u)],
      ],
      typeInstitution: [
        { value: null, disabled: false },
        [Validators.required],
      ],
      typeTeaching: [{ value: null, disabled: false }, [Validators.required]],
      typeOpeningHours: [
        { value: null, disabled: false },
        [Validators.required],
      ],
      cnpj: [
        { value: null, disabled: false },
        [Validators.required, Validators.minLength(14), cpfCnpjValidator()],
      ],
      directorName: [
        { value: null, disabled: false },
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-zA-ZÀ-ÖØ-öø-ÿ])(?=.*\s)[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/
          ),
        ],
      ],
      location: this._fb.group({
        cep: [
          { value: null, disabled: false },
          [Validators.required, Validators.minLength(8)],
        ],
        street: [{ value: null, disabled: false }, [Validators.required]],
        number: [{ value: null, disabled: true }, [Validators.required]],
        neighborhood: [{ value: null, disabled: false }, [Validators.required]],
        city: [{ value: null, disabled: false }, [Validators.required]],
        state: [{ value: null, disabled: false }, [Validators.required]],
      }),
    });
  }

  getTypeInstitution(): void {
    this._schoolService.typeInstitution().subscribe({
      next: (res) => {
        this.typeInstitution = res;
      },
    });
  }

  getTypeTeaching(): void {
    this._schoolService.typeTeaching().subscribe({
      next: (res) => {
        this.typeTeaching = res;
      },
    });
  }

  getTypeOpeningHours(): void {
    this._schoolService.typeOpeningHours().subscribe({
      next: (res) => {
        this.typeOpeningHours = res;
      },
    });
  }

  getCep(cep: string): void {
    this.form.get('location')?.get('number')?.disable();
    this.address = '';
    if (cep.length < 8) return;
    let control = this.form.get('location')?.get('cep');
    control?.setErrors(null);
    this._cepService.getCep(cep).subscribe({
      next: (res) => {
        if (res.erro) {
          let error = { invalidCep: true };
          control?.setErrors(error);
          return;
        }
        this.setLocation(res);
        this.setAddress();
      },
    });
  }

  setLocation(location: any): void {
    this.form.get('location')?.patchValue({
      street: location.logradouro,
      neighborhood: location.bairro,
      city: location.localidade,
      state: location.uf,
    });
  }

  setAddress(): void {
    this.form.get('location')?.get('number')?.enable();
    const formValue = this.form.value.location;
    this.address = `${formValue.state}, ${formValue.city} - ${
      formValue.neighborhood
    }, ${formValue.street}, ${formValue.number || ''}`;
  }

  create(): void {
    const payload: ISchool = this.form.value;
    this._schoolService.createSchool(payload).subscribe({
      next: (res) => {
        this.close();
        this._toastr.success('Escola cadastrada com sucesso!');
      },
      error: () => {
        this._toastr.error('Houve um problema, tente novamente ou mais tarde');
      },
    });
  }

  close() {
    this._ref.close();
  }
}
