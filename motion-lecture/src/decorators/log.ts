// src/decorators/log.ts

// Log 함수는 함수의 이름과 함수가 어떻게 생겼는지 정의하는 descriptor 를 인자로 받아오고
// 다시 재정의한 것인 PropertyDescriptor 를 return 한다.
function Log(
  _: any,
  name: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const newDescriptor = {
    ...descriptor,
    // 새로운 함수를 만드는데, 필요한 로그를 출력하고 함수의 이름과 어떤 인자 있는지 출력을 하고
    value: function (...args: any[]): any {
      console.log(`Calling ${name} with arguments:`);
      console.dir(args);
      // 기존에 있는 함수를 호출하고 그 결과값을 로그로 출력하고 해당 결과값을 리턴한다.
      const result = descriptor.value.apply(this, args);
      console.log(`Result:`);
      console.dir(result);
      return result;
    },
  };

  return newDescriptor;
}

class Calculator {
  // 로그 데코레이터를 어노테이션 형태로 만든다.
  // experimentalDecorators 옵션을 tsconfig 혹은 jsconfig 에서 true로 설정해야한다.
  // 데코레이터는 아직 표준화되지 못했기 때문에 위와 같은 옵션을 설정해줘야 에러를 없앨 수 있다.
  // 터미널에서 cd src/decorators > tsc --init >> 데코레이터 폴더 하위에 tsconfig.json 파일이 생성됨
  // 그런 다음 ts-node log.ts 를 실행해보면 데코레이터 내부 코드의 동작을 확인할 수 있다.
  @Log
  add(x: number, y: number): number {
    return x + y;
  }
}

const calculator = new Calculator();
console.log(calculator.add(1, 2));
