import { ISchool } from 'src/app/modules/school/models/school.model';

export const schools_mock: ISchool[] = [
  {
    name: 'Escola Estadual Frei Egídio Parisi',
    typeInstitution: 0,
    typeTeaching: [0, 1, 2, 3],
    typeOpeningHours: [0, 1, 2],
    cnpj: '01576476000138',
    directorName: 'Washington Ferreira Silvano',
    location: {
      cep: '77066012',
      street: 'Avenida Copacabana',
      number: '233',
      neighborhood: 'Setor Morada do Sol (Taquaralto)',
      city: 'Palmas',
      state: 'TO',
    },
    id: 1,
  },
];
export const school_mock: ISchool = {
  name: 'Escola Estadual Frei Egídio Parisi',
  typeInstitution: 0,
  typeTeaching: [0, 1, 2, 3],
  typeOpeningHours: [0, 1, 2],
  cnpj: '01576476000138',
  directorName: 'Washington Ferreira Silvano',
  location: {
    cep: '77066012',
    street: 'Avenida Copacabana',
    number: '233',
    neighborhood: 'Setor Morada do Sol (Taquaralto)',
    city: 'Palmas',
    state: 'TO',
  },
  id: 1,
};
