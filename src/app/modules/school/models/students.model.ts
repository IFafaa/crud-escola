import { ENUM_OPENING_HOURS_TYPE } from 'src/app/shared/enums/opening-hours-type.enum';
import { ENUM_TEACHING_TYPE } from 'src/app/shared/enums/teaching-type.enum';

export interface IStudent {
  id: number;
  idClass: number;
  idSchool: number;
  name: string;
  age: string;
  cpf: string;
}
