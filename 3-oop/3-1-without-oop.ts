{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  const BEANS_GRAMM_PER_SHOT: number = 7;
  let coffeeBeans: number = 0;

  function makeCoffee(shots: number): CoffeeCup {
    // 갖고있는 커피콩이 필요로 하는 커피콩의 양보다 작다면 error
    if (coffeeBeans < shots * BEANS_GRAMM_PER_SHOT) {
      throw new Error("Not enough coffee beans!");
    }

    coffeeBeans -= shots * BEANS_GRAMM_PER_SHOT;
    return {
      shots,
      hasMilk: false,
    };
  }

  // 그대로 실행하면 error 발생, 2샷 즉 14개의 커피콩이 필요한대 현재 coffeeBeans는 0개 이므로
  // => 아래와 같이 커피콩을 추가해준다.
  coffeeBeans += 3 * BEANS_GRAMM_PER_SHOT;
  const coffee = makeCoffee(2);
  console.log(coffee);
}
