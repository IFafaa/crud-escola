import { ENUM_OPENING_HOURS_TYPE } from 'src/app/shared/enums/opening-hours-type.enum';
import { ENUM_SCHOOL_TYPE } from 'src/app/shared/enums/school-type.enum';
import { ENUM_TEACHING_TYPE } from 'src/app/shared/enums/teaching-type.enum';

export interface ISchool {
  id: number;
  name: string;
  cnpj: string;
  typeInstitution: ENUM_SCHOOL_TYPE;
  typeTeaching: ENUM_TEACHING_TYPE[];
  typeOpeningHours: ENUM_OPENING_HOURS_TYPE[];
  directorName: string;
  location: ILocation;
}

interface ILocation {
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
}
