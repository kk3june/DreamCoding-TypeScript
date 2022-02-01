{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    // 생성자를 public 혹은 protected 으로 바꿔야 외부에 있는 cafeLatteMachine에서 extends 할 수 있다.
    public constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    clean() {
      console.log('cleaning the machine...');
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error('value for beans should be greater than 0');
      }
      this.coffeeBeans += beans;
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT) {
        throw new Error('Not enough coffee beans!');
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
    }

    private preheat(): void {
      console.log('heating up... 🔥');
    }

    private extract(shots: number): CoffeeCup {
      console.log(`Pulling ${shots} shots...`);
      return {
        shots,
        hasMilk: false,
      };
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  // 카페라떼 머신 추가
  // 내용은 CoffeeMachine와 동일, 우유만 추가
  // 상속을 받으려면 부모가 되는 클래스의 생성자를 public 혹은 protected로 수정해야 한다.
  class CafeLatteMachine extends CoffeeMachine {
    constructor(beans: number, readonly serialNumber: string) {
      // 추가적으로 어떤 데이터를 받아올 때는 공통적으로 부모 클래스에서 필요한 데이터도 받아오고
      // super를 통해 전달해주어야 한다.
      super(beans);
    }

    // 자식 클래스에서만 사용할 함수
    private steamMilk(): void {
      console.log('Steaming some milk...🥛');
    }

    // OverWriting
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      this.steamMilk();
      return {
        ...coffee,
        hasMilk: true,
      };
    }
  }

  // latteMachine 은 CoffeeMachine 을 상속한 CaffeLatteMachine을 상속 받았으므로 CoffeeMachine 의 모든 함수가 사용 가능하다.
  const machine = new CoffeeMachine(23);
  // latteMachine 에만 serialNumber에 접근할 수 있다.
  const latteMachine = new CafeLatteMachine(23, 'SSS');

  const coffee = latteMachine.makeCoffee(1);
  console.log(coffee); //

  // 상속한 클래스에서 조금 더 다른 동작을 하고 싶다.
  // => OverWriting , 자식 클래스에서 부모 클래스에 있는 함수를 덮어씌운다.
}
