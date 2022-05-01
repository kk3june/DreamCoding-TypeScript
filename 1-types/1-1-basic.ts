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
  let name: undefined; // 💩
  let age: number | undefined;
  age = undefined;
  age = 1;
  function find(): number | undefined {
    return undefined;
  }

  // null
  let person: null; // 💩
  let person2: string | null;

  // unknown 💩
  let notSure: unknown = 0;
  notSure = "he";
  notSure = true;

  // any 💩
  let anything: any = 0;
  anything = "hello";

  // void
  function print(): void {
    console.log("hello");
    return;
  }
  let unusable: void = undefined; // 💩

  // never
  function throwError(message: string): never {
    // message -> server (log)
    throw new Error(message);
    while (true) {}
  }
  let neverEnding: never; // 💩
  // throw error : 어플리케이션에서 전혀 예상치 못한, 혹은 핸들링할 수 없는 에러가 발생했을 때 호출할 수 있는 함수

  // objet
  let obj: object; // 💩, 가능하면 ojbect도 구체적으로 명시해서 작성하는 것이 좋다.(이후 강의에서 나올 내용)
  function acceptSomeObject(obj: object) {}
  acceptSomeObject({ name: "ellie" });
  acceptSomeObject({ animal: "dog" });
}
// object 타입은 배열도 전달할 수 있다.
// let obj: object = [1, 2, 3];
