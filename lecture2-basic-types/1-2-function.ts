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
}
