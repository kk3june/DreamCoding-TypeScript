/**
 * Let's make a game 🕹
 */

type Direction = "up" | "down" | "left" | "right";
let my_position = { x: 0, y: 0 };
function my_move(direction: Direction) {
  switch (direction) {
    case "up":
      return (my_position.y += 1);
    case "down":
      return (my_position.y -= 1);
    case "left":
      return (my_position.x -= 1);
    case "right":
      return (my_position.x += 1);
    default:
      throw new Error("input wrond direction");
  }
}

console.log(my_position); // { x: 0, y: 0}
my_move("up");
console.log(my_position); // { x: 0, y: 1}
my_move("down");
console.log(my_position); // { x: 0, y: 0}
my_move("left");
console.log(my_position); // { x: -1, y: 0}
my_move("right");
console.log(position); // { x: 0, y: 0}
