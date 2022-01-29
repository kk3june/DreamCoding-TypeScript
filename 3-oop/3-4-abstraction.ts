{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  interface CommercialCoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
    clean(): void;
  }

  //CoffeeMachine 클래스는 CoffeeMaker와 CommercialCoffeeMaker 2가지 인터페이스 모두를 따른다.
  //현재 CoffeeMachine 클래스에서는 위에 CommercialCoffeMaker에서 추가한 clean API가 빠져있으므로 추가
  class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0; // instance (object) level

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
      // 커피 만드는 과정을 3가지로 구분
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  // 이렇게 인터페이스로 다시 타입을 제한해서 받게되면 인터페이스에서 정의된 아이들만 사용할 수 있다.
  const maker2: CommercialCoffeeMaker = CoffeeMachine.makeMachine(32);
  maker2.fillCoffeeBeans(32);
  maker2.makeCoffee(2);
  maker2.clean();

  // 예제
  // CoffeeMaker 인터페이스를 생성자에서 받아오고
  class AmateurUser {
    constructor(private machine: CoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
    }
  }

  // CommercialCoffeeMaker 라는 인터페이스를 생성자에서 받아온다.
  class ProBarista {
    constructor(private machine: CommercialCoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      this.machine.fillCoffeeBeans(45);
      this.machine.clean();
    }
  }

  // makeMachine을 이용하면 CoffeeMachine 라는 오브젝트를 리턴하는데
  // CoffeeMachine 이라는 타입으로 오브젝트를 받게되면 오브젝트 안에 있는 퍼블릭 함수들은 다 접근 가능
  const maker: CoffeeMachine = CoffeeMachine.makeMachine(32);
  const amateur = new AmateurUser(maker);
  const pro = new ProBarista(maker);
  amateur.makeCoffee();
  pro.makeCoffee();
}
