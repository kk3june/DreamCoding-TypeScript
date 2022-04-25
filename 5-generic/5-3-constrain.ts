{
  interface Employee {
    pay(): void;
  }

  class FullTimeEmployee implements Employee {
    pay() {
      console.log("This is FullTimeWorker");
    }
    workFullTime() {}
  }

  class PartTimeEmployee implements Employee {
    pay() {
      console.log("This is PartTimeWorker");
    }
    workPartTime() {}
  }

  // Bad, 세부적인 타입을 인자로 받아서 정말 추상적인 타입으로 리턴하는 함수 💩💩
  function payBad(employee: Employee): Employee {
    employee.pay();
    return employee;
  }

  function pay<T extends Employee>(employee: T): T {
    employee.pay();
    return employee;
  }

  const jun = new FullTimeEmployee();
  const bob = new PartTimeEmployee();

  jun.workFullTime();
  bob.workPartTime();

  const junAfterPay = pay(jun);
  const bobAfterPay = pay(bob);
}
