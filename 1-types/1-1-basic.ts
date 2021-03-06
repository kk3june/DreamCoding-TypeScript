{
  /**
   * JavaScript
   * Primitive: number, string, boolean, bigint, symbol, null, undefined
   * Object: function, array.....
   */

  // number
  const num: number = -6;

  // string
  const str: string = "hello";

  // boolean
  const boal: boolean = false;

  // undefined
  let name: undefined; // π©
  let age: number | undefined;
  age = undefined;
  age = 1;
  function find(): number | undefined {
    return undefined;
  }

  // null
  let person: null; // π©
  let person2: string | null;

  // unknown π©
  let notSure: unknown = 0;
  notSure = "he";
  notSure = true;

  // any π©
  let anything: any = 0;
  anything = "hello";

  // void
  function print(): void {
    console.log("hello");
    return;
  }
  let unusable: void = undefined; // π©

  // never
  function throwError(message: string): never {
    // message -> server (log)
    throw new Error(message);
    while (true) {}
  }
  let neverEnding: never; // π©
  // throw error : μ΄νλ¦¬μΌμ΄μμμ μ ν μμμΉ λͺ»ν, νΉμ νΈλ€λ§ν  μ μλ μλ¬κ° λ°μνμ λ νΈμΆν  μ μλ ν¨μ

  // objet
  let obj: object; // π©, κ°λ₯νλ©΄ ojbectλ κ΅¬μ²΄μ μΌλ‘ λͺμν΄μ μμ±νλ κ²μ΄ μ’λ€.(μ΄ν κ°μμμ λμ¬ λ΄μ©)
  function acceptSomeObject(obj: object) {}
  acceptSomeObject({ name: "ellie" });
  acceptSomeObject({ animal: "dog" });
}
// object νμμ λ°°μ΄λ μ λ¬ν  μ μλ€.
// let obj: object = [1, 2, 3];
