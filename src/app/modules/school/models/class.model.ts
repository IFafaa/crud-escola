import { ENUM_OPENING_HOURS_TYPE } from "src/app/shared/enums/opening-hours-type.enum";
import { ENUM_TEACHING_TYPE } from "src/app/shared/enums/teaching-type.enum";

export interface IClass {
  id: number,
  idSchool: number,
  name: string,
  series: number,
  typeTeaching: ENUM_TEACHING_TYPE,
  typeOpeningHours: ENUM_OPENING_HOURS_TYPE
}
