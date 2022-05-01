/**
 * Let's make a calculator 🧮
 */

function my_calculate(operation: string, num1: number, num2: number): number {
  if (operation === "add") {
    return num1 + num2;
  } else if (operation === "substract") {
    return num1 - num2;
  } else if (operation === "multiply") {
    return num1 * num2;
  } else if (operation === "divide") {
    return num1 / num2;
  } else if (operation === "remainder") {
    return num1 % num2;
  } else {
    return 0;
  }
}

console.log(my_calculate("add", 1, 3)); // 4
console.log(my_calculate("substract", 3, 1)); // 2
console.log(my_calculate("multiply", 4, 2)); // 8
console.log(my_calculate("divide", 4, 2)); // 2
console.log(my_calculate("remainder", 5, 2)); // 1
