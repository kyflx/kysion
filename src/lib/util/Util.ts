/**
 * Copyright ©️ Kyflx Developments. All rights reserved.
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

export default class Util {
  public static isObject(input: any): input is Record<any, any> {
    return input && input.constructor === Object;
  }

  public static mergeObjects<
    T extends Record<any, any>,
    S extends Record<any, any>
  >(target: T, source: S): T & S {
    for (const key in source)
      target[key] = Util.isObject(source[key])
        ? Util.mergeObjects(target[key], source[key])
        : source[key];
    return target;
  }
}
