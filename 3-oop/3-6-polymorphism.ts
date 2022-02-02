// # 3-6-polymorphism.ts 
{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    clean() {
      console.log("cleaning the machine...");
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans += beans;
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
    }

    private preheat(): void {
      console.log("heating up... 🔥");
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

  class CaffeLatteMachine extends CoffeeMachine {
    constructor(beans: number, public readonly serialNumber: string) {
      super(beans);
    }
    private steamMilk(): void {
      console.log("Steaming some milk...🥛");
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      this.steamMilk();
      return {
        ...coffee,
        hasMilk: true,
      };
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return {
        ...coffee,
        hasSugar: true,
      };
    }
  }
  // 여기까지 CoffeeMachine, CaffeLatteMachine, SweetCoffeeMaker 3가지 커피머신을 구현
  // 커피머신은 부모 클래스
  // 카페라떼머신, 스윗커피메이커는 커피머신을 상속한 클래스
  // => 다형성을 이용하면 한 가지의 클래스나 한 가지의 인터페이스를 통해서 다른 방식으로 구현한 클래스를 만들 수 있다.

  const machines = [
    new CoffeeMachine(16),
    new CaffeLatteMachine(16, "1"),
    new SweetCoffeeMaker(16),
    new CoffeeMachine(16),
    new CaffeLatteMachine(16, "1"),
    new CoffeeMachine(16),
  ];
  // 배열에 만든 모든 커피머신을 빙글빙글 돌면서 커피를 만든걸 확인해볼 수 있다.
  // ✅ 다형성의 장점: 내부적으로 구현된 다양한 클래스들이 한가지 인터페이스를 구현하거나
  // 동일한 부모 클래스를 상속했을 때
  // 동일한 함수를 어떤 클래스인지 구분하지 않고 공통된 api를 호출할 수 있다.
  machines.forEach((machine) => {
    console.log("--------------");
    machine.makeCoffee(1);
    // 여기서 machine 은 커피머신의 배열로 모든 pulbic들의 호출이 가능하다.
  });
}