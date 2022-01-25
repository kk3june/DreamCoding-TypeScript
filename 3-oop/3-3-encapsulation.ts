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
}
