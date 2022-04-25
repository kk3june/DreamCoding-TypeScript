{
  /**
   * Type Aliases
   */
  // type alias 를 사용하면 직접 type을 정의할 수 있다.
  type Text = string;
  const name: Text = "ellie";
  const address: Text = "korea";
  type Num = number;
  // ✅ 원시 타입 뿐만 아니라 object 형태도 정의할 수 있다.
  type Student = {
    name: string;
    age: number;
  };
  const student: Student = {
    name: "ellie",
    age: 12,
  };

  /**
   * String Literal Types
   */
  type Name = "name";
  let ellieName: Name;
  ellieName = "name";
  type JSON = "json";
  const json: JSON = "json";

  type Boal = true;
}
