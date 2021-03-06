{
  // โ Array
  const fruits: string[] = ["๐", "๐ฅ", "๐"];
  const scores: Array<number> = [1, 2, 3];
  function printArray(fruits: readonly string[]) {
    // readonly๋ฅผ ์ฌ์ฉํ๋ฉด ์ธ์๋ก ์ค๋ ๋ฐฐ์ด์ ์์ ํ  ์ ์๋ค. ์ค์ง ์ฝ๊ธฐ์ ์ฉ
    // Array<number> ์ readnoly ์ฌ์ฉ๋ถ๊ฐ
  }

  // Tuple => ํํ ์ฌ์ฉํ๋๊ฑฐ ๊ถ์ฅ X, ๋ฐ์ดํฐ์ ์ ๊ทผํ  ๋ index๋ก ์ ๊ทผํ๋ ๊ฒ์ ๊ฐ๋์ฑ ๋จ์ด์ง
  // => interface, type alias, class ๋ฅผ ๋์  ์ฌ์ฉํ๋ค.
  let student: [string, number];
  student = ["name", 123];
  student[0]; // name
  student[1]; // 123

  // ๋์  ํด๋์ค๋ obj๋ฅผ ์ฌ์ฉํ๋ฉด ์๋์ ๊ฐ์ด ์ข ๋ ๋ชํ
  student.name;
  student.age;

  // object destructuring -> student ๋ฐฐ์ด์ ์ฒซ๋ฒ์งธ ๊ฐ์ด name, ๋๋ฒ์งธ ๊ฐ์ด age๋ก ํ ๋น
  const [name, age] = student;
}
