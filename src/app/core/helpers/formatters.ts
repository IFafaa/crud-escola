import { ENUM_OPENING_HOURS_TYPE } from 'src/app/shared/enums/opening-hours-type.enum';
import { ENUM_SCHOOL_TYPE } from 'src/app/shared/enums/school-type.enum';
import { ENUM_SERIES_TYPE } from 'src/app/shared/enums/series.type.enum';
import { ENUM_TEACHING_TYPE } from 'src/app/shared/enums/teaching-type.enum';

export class Formatters {
  public static formatTypeTeaching(idTypeTeaching: ENUM_TEACHING_TYPE): string {
    const FORMATTER_TEACHING_TYPE = {
      0: 'Jardim de infância',
      1: 'Ensino Fundamental I',
      2: 'Ensino Fundamental II',
      3: 'Ensino Médio',
    };
    return FORMATTER_TEACHING_TYPE[idTypeTeaching] || '';
  }

  public static formatOpeningHours(
    idOpeningHours: ENUM_OPENING_HOURS_TYPE
  ): string {
    const FORMATTER_OPENING_HOURS_TYPE = {
      0: 'Manhã',
      1: 'Tarde',
      2: 'Noite',
    };
    return FORMATTER_OPENING_HOURS_TYPE[idOpeningHours] || '';
  }

  public static formatSchoolType(schoolType: ENUM_SCHOOL_TYPE): string {
    const FORMATTER_SCHOOL_TYPE = {
      0: 'Estadual',
      1: 'Municipal',
    };
    return FORMATTER_SCHOOL_TYPE[schoolType];
  }

  public static formatClassName(className: string, series: ENUM_SERIES_TYPE): string {
    const FORMATTER_SERIE_TYPE = {
      0: 'Berçário ou Creche',
      1: 'Maternal I',
      2: 'Maternal II',
      3: 'Pré-Escola',
      4: '1º Ano',
      5: '2º Ano',
      6: '3º Ano',
      7: '4º Ano',
      8: '5º Ano',
      9: '6º Ano',
      10: '7º Ano',
      11: '8º Ano',
      12: '9º Ano',
      13: '1º Ano',
      14: '2º Ano',
      15: '3º Ano',
    };

    return FORMATTER_SERIE_TYPE[series] + " - " + className;
  }
}
