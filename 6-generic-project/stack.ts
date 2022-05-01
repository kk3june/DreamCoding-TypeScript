{
  interface Stack<T> {
    readonly size: number;
    push(value: T): void;
    pop(): T;
  }

  type StackNode<T> = {
    readonly value: T;
    readonly next?: StackNode<T>;
  };

  class StackImpl<T> implements Stack<T> {
    private _size: number = 0;
    private head?: StackNode<T>;

    constructor(private capacity: number) {}
    get size() {
      return this._size;
    }

    push(value: T) {
      if (this.size === this.capacity) {
        throw new Error("Stack is full!");
      }
      this._size++;
      // 여기서는 타입추론을 활용해볼 수 있다.
      // const node: StackNode<T> = { value, next: this.head };
      const node = { value, next: this.head };
      this.head = node;
    }
    pop(): T {
      if (this.head == null) {
        throw new Error("Stack is empty!");
      }
      const node = this.head;
      this.head = node.next;
      this._size--;
      return node.value;
    }
  }

  // **** 이제 인스턴스를 생성할 때 따로 타입을 명시하지 않으면 unknown 으로 되어져 있다.
  const stack = new StackImpl<String>(10);
  stack.push("Jun");
  stack.push("3jun");
  stack.push("push 2");

  while (stack.size !== 0) {
    console.log(stack.pop());
  }

  const stack2 = new StackImpl<Number>(10);
  stack2.push(123);
  stack2.push(456);
  stack2.push(789);

  console.log(stack2);
  while (stack2.size !== 0) {
    console.log(stack2.pop());
  }
}
