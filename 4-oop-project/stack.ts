interface Stack {
  readonly size: number;
  push(value: string): void;
  pop(): string;
}

type StackNode = {
  readonly value: string;
  readonly next?: StackNode;
};

class StackImpl implements Stack {
  private _size: number = 0;
  private head?: StackNode;

  constructor(private capacity: number) {}

  get size() {
    return this._size;
  }

  push(value: string) {
    if (this.size === this.capacity) {
      throw new Error('Stack is full!');
    }
    const node: StackNode = {
      value,
      next: this.head,
    };
    this.head = node;
    this._size++;
  }

  pop(): string {
    // 위에서 head는 ?, 옵셔널이다. 즉 StackNode 일수도 undefined 일 수도 있다.
    // 하지만 this.head === undefined => 위험하다.
    // 자바스크립트와 연동할 경우 변수에 null 또는 undefined 를 할당 받는 경우도 있기 때문
    // 타입스크립트에서는 strict null check 옵션을 주어 이런 문제를 예방할 수 있다.
    if (this.head == null) {
      // null == undefined, null !== undefined
      throw new Error('Stack is empty!');
    }
    const node = this.head;
    this.head = node.next;
    this._size--;
    return node.value;
  }
}

const stack = new StackImpl();
stack.push('Ellie 1');
stack.push('Bob 2');
stack.push('Stece 3');

while (stack.size !== 0) {
  console.log(stack.pop());
}
