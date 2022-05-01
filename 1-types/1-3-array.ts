{
  // ✅ Array
  const fruits: string[] = ["🍓", "🥝", "🍌"];
  const scores: Array<number> = [1, 2, 3];
  function printArray(fruits: readonly string[]) {
    // readonly를 사용하면 인자로 오는 배열을 수정할 수 없다. 오직 읽기전용
    // Array<number> 은 readnoly 사용불가
  }

  // Tuple => 튜플 사용하는거 권장 X, 데이터에 접근할 때 index로 접근하는 것은 가독성 떨어짐
  // => interface, type alias, class 를 대신 사용한다.
  let student: [string, number];
  student = ["name", 123];
  student[0]; // name
  student[1]; // 123

  // 대신 클래스나 obj를 사용하면 아래와 같이 좀 더 명확
  student.name;
  student.age;

  // object destructuring -> student 배열의 첫번째 값이 name, 두번째 값이 age로 할당
  const [name, age] = student;
}
