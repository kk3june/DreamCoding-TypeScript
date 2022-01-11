// #1-2-functions
{
  // JavaScript
  function jsAdd(num1, num2) {
    return num1 + num2;
  }

  // TypeScript
  function add(num1: number, num2: number): number {
    return num1 + num2;
  }

  // JavaScript - 무언가 fetch를 해서 어떤 코드가 발생하다가 promise를 return 하는 함수
  function jsFetchNum(id) {
    // code..
    // code..
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  // ✅ TypeScript - 정확하게 명시되어있지 않지만 id는 보통 string 값
  function fetchNum(id: string): Promise<number> {
    // code..
    // code..
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  // JavaScript => TypeScript
  // Optional parameter
  function printName(firstName: string, lastName: string) {
    console.log(firstName);
    console.log(lastName);
  }

  printName("Steve", "Jobs");
  printName("Ellie"); // => 정해진 인자 갯수, 정해진 타입대로 인자를 넣지 않으면 에러

  // 두번째 인자 lastName 은 option
  function printName2(firstName: string, lastName?: string) {
    console.log(firstName);
    console.log(lastName);
  }
  // 두번째 인자를 lastName: string | undefined) 로 할 경우에는
  // printName('Ellie', undefined) 와 같이 명시되지 않은 인자는 반드시 undefined 명시해야..
  // 따라서 optional parameter 를 사용할 때는 ? 를 사용

  //default parameter
  function printMessage(message: string = "default message") {
    console.log(message);
  }
  printMessage();

  // Rest parameter
  function addNumbers(...numbers: number[]) {
    return numbers.reduce((a, b) => a + b);
  }
  console.log(addNumbers(1, 2)); // 3
  console.log(addNumbers(1, 2, 3, 4)); // 10
  console.log(addNumbers(1, 2, 3, 4, 5, 6)); // 15
}
