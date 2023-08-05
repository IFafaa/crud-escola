export class Filters {
  public static removeNullUndefinedKeys(obj: any): any {
    for (let key in obj) {
      if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
        delete obj[key];
      }
    }
    return obj;
  }

  public static adjustObjLike(obj: any): any {
    let objLike: any = {};
    for (let key in obj) {
      objLike[`${key}_like`] = obj[key];
    }
    return objLike;
  }
}
