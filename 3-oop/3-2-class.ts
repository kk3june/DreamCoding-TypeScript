{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // 개선하기 위해 우선 클래스를 만들기
  //-> 서로 관련있는 데이터나 함수들을 한 곳에 묶어 놓는 기능
  //  커피에 관련된 모든 속성과 함수들이 들어갈 것
  //✅ 클래스 안에서 멤버변수 사용할 때는 const,let 같은 키워드 사용X
  class CoffeeMaker {
    // BEANS_GRAMM_PER_SHOT은 클래스에서 정해진 것으로 변하지 않는다.
    // 이 커피메이커는 한 가지 샷을 만들때 7g의 커피를 사용하고 이것은 클래스 내부에서 연결된 정보이고 변하지 않는 숫자.
    // 이렇게 멤버변수로 작성하게 되면 클래스를 이용해서 만드는 오브젝트마다 해당 숫자가 들어있다. -> 메모리 낭비
    // ✅  static 키워드 붙이면 클래스 레벨로 지정된다.
    static BEANS_GRAMM_PER_SHOT: number = 7;
    coffeeBeans: number = 0; // instance (object) level

    // constructor : 클래스를 가지고 object 인스턴스를 만들 때 항상 호출되는 함수
    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    // constructor 를 호출하지 않고 새로운 커피 기계를 만들고 싶을때
    // 아래 함수를 사용해 초기값을 받아올 수 있고 이 함수는 커피메이커를 만들어서 리턴해주는 함수이다.
    // 이런 함수는 클래스 내부의 어떤 속성 값도 필요하지 않기 때문에 static을 붙여주면 외부에서 이 클래스를 만들지 않고 CoffeeMaker Class에 있는 makeMachine 라는 함수를 이용해서 커피 기계를 만들어 줄 수 있다.
    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    makeCoffee(shots: number): CoffeeCup {
      // 클래스 안에서 클래스 안에 있는 멤버변수에 접근할때는 this 사용
      // 클래스 레벨의 데이터에 접근할 때는 클래스 이름을 사용
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

  const maker = new CoffeeMaker(32);
  console.log(maker);
  const maker2 = new CoffeeMaker(14);
  console.log(maker2);

  const maker3 = CoffeeMaker.makeMachine(3);
  console.log(maker3);
}

// static 키워드가 붙으면? => 클래스 레벨
// static 붙지 않으면? => 인스턴스 레벨, 멤버변수 (instance, object)
// 클래스 레벨은 오브젝트마다 생성되지 않고, 인스턴스 레벨은 오브젝트 별로 생성됨 따라서 오브젝트마다 만들어 줘야 하는 데이터는 멤버변수로 만든다.
// 이것은 함수에도 적용된다.
