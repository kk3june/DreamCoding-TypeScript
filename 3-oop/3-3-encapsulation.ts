{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // 정보를 은닉할 수 있는 방법 => public, private, protected
  // 따로 작성하지 않으면 기본 값은 public
  class CoffeeMaker {
    // 이렇게 private 키워드를 추가하면 더 이상 외부에서 접근할 수 없다.
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0; // instance (object) level

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    // 외부에서 coffe beans 갯수를 수정할 수 있는 함수 추가
    // 이 함수에서 전달 받는 인자가 유효한지 검사
    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error('value for beans should be greater than 0');
      }
      this.coffeeBeans += beans;
    }

    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT) {
        throw new Error('Not enough coffee beans!');
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }
  }

  const maker = CoffeeMaker.makeMachine(32);
  // //maker라는 오브젝트의 coffeeBeans 를 외부에서 수정할 수 있다.
  // maker.coffeeBeans = 3;
  // console.log(maker);

  // // 만약 아래와 같이 수정된다면 치명적인 오류를 발생 시킬 수도 있음
  // maker.coffeeBeans = -33;  //invalid
  maker.fillCoffeeBeans(20);
  console.log(maker);

  class User {
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }

    private internalAge = 4;
    get age(): number {
      return this.internalAge;
    }

    set age(num: number) {
      // 전달된 숫자에 대한 유효성 검사도 할 수 있다.
      if (num < 0) {
      }
      this.internalAge = num;
    }

    constructor(private firstName: string, private lastName: string) {}
  }

  const user = new User('Steve', 'Jobs');
  user.age = 6;
  // => setter 가 호출되면서 내부적으로는 internalAge라는 멤버변수를 전달된 6으로 업데이트 한다.
}

// private : 외부의 그 어떤 것이라도 private 키워드가 붙은 내부 데이터나 함수에 접근할 수 없다.
// protected : 같은 클래스를 상속한 인스턴스에서만 접근이 가능하고 외부에서는 접근이 불가능하다.

// getter와 setter은 일반 변수처럼 사용이 가능하지만 어떤 계산을 해야할 때 유용하게 사용할 수 있다.
