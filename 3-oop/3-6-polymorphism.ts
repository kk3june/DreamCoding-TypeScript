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

  // 1. 싸구려 우유 거품기
  class CheapMilkSteamer {
    private steamMilk(): void {
      console.log('Steaming some milk...🥛');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // 2. 설탕제조기
  class AutomaticSugarMixer {
    private getSugar() {
      console.log('Getting some sugar from candy 🍭');
      return true;
    }

    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar();
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }
  // 싸구려 우유 거품기와 설탕 제조기를 만들고
  // 우유와 설탕이 필요한 곳에 각각 로직을 반복해서 사용 X
  // 위 함수를 통해 필요한 곳에 주입하여 사용 => Dependency Injection

  class CaffeLatteMachine extends CoffeeMachine {
    constructor(
      beans: number,
      public readonly serialNumber: string,
      private milkFrother: CheapMilkSteamer
    ) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      // this.steamMilk();
      // return {
      //   ...coffee,
      //   hasMilk: true,
      // };
      return this.milkFrother.makeMilk(coffee);
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    // 설탕 가져오기 (설탕을 넣기 전 설탕이 있는지 확인해야하는 로직이 있다고 가정)
    // SweetCoffeeMaker는 CoffeeMachine을 상속 했으므로 beans 정보도 받아와야 한다.
    constructor(private beans: number, private sugar: AutomaticSugarMixer) {
      super(beans);
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      // this.getSugar();
      // return {
      //   ...coffee,
      //   hasSugar: true,
      // };
      return this.sugar.addSugar(coffee);
    }
  }

  class SweetCaffeLatteMachine extends CoffeeMachine {
    constructor(
      private beans: number,
      private milk: CheapMilkSteamer,
      private sugar: AutomaticSugarMixer
    ) {
      super(beans);
    }
    makerCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      const sugarAdded = this.sugar.addSugar(coffee);
      return this.milk.makeMilk(sugarAdded);
    }
  }

  // ✅ 치명적인 단점
  // CoffeeMachine, CaffeLatteMachine, SweetCoffeeMaker
  // 위 3가지는 CheapMilkSteamer, AutomaticSugarMixer 와 굉장히 타이트하게 커플링 되어있다.
  // 즉 항상 이 2가지 컴포지션을 사용해야 하며 다른 설탕 제조기를 만들었을 때 이 모든 클래스가 업데이트 되어야 하고 클래스들은 해당 컴포지션만 사용할 수 있도로 스스로를 제약하고 있다.
  // 이것을 다음 강의에서 개선할 것

  const machines: CoffeeMaker[] = [
    new CoffeeMachine(16),
    new CaffeLatteMachine(16, '1'),
    new SweetCoffeeMaker(16),
    new CoffeeMachine(16),
    new CaffeLatteMachine(16, '1'),
    new CoffeeMachine(16),
  ];

  machines.forEach((machine) => {
    console.log('--------------');
    machine.makeCoffee(1);
  });
  // 배열에 만든 모든 커피머신을 빙글빙글 돌면서 커피를 만든걸 확인해볼 수 있다.
  // ✅ 다형성의 장점: 내부적으로 구현된 다양한 클래스들이 한가지 인터페이스를 구현하거나
  // 동일한 부모 클래스를 상속했을 때
  // 동일한 함수를 어떤 클래스인지 구분하지 않고 공통된 api를 호출할 수 있다.
  machines.forEach((machine) => {
    console.log('--------------');
    machine.makeCoffee(1);
    // 여기서 machine 은 커피머신의 배열로 모든 pulbic들의 호출이 가능하다.
  });
}
