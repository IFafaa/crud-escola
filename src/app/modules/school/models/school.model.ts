export interface ISchool {
  name: string;
  cnpj: string;
  typeInstitution: number;
  typeTeaching: number[];
  typeOpeningHours: number[];
  directorName: string;
  location: Location;
}

interface ILocation {
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
}
