/**
 * Copyright ©️ Kyflx Developments. All rights reserved.
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

export default class Util {
  public static isObject(input: any): input is Record<any, any> {
    return input && input.constructor === Object;
  }

  /**
   * Verify if the input is a class constructor.
   * @param input - The function to verify
   * @since 0.5.0
   */
  public static isClass(input: any): input is Function {
    return typeof input === 'function' &&
      typeof input.prototype === 'object' &&
      input.toString().substring(0, 5) === 'class';
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
