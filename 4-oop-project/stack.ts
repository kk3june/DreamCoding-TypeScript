{
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
    private _size: number = 0; // 내부에서만 쓰이는 변수
    private head?: StackNode;
    get size() {
      // pubilc size 변수
      return this._size;
    }

    push(value: string) {
      this._size++;
      const node: StackNode = { value, next: this.head };
      this.head = node;
    }
    pop(): string {
      if (this.head == null) {
        // StackNode 타입을 확인하면 여기서 정확하게는 null 체크가 아니라 undefined 체크를 해야..
        // 여기는 strict null check, but 자바스크립트 코드와 연동할때는 head 가 null 혹은 undefined 일수도 있다.
        // null 체크는 null, undefined 일 때 모두 체크 가능
        throw new Error("Stack is empty!");
      }
      const node = this.head;
      this.head = node.next;
      this._size--;
      return node.value;
    }
  }

  const stack = new StackImpl();
  stack.push("Jun");
  stack.push("3jun");
  stack.push("push 2");

  while (stack.size !== 0) {
    console.log(stack.pop());
  }
}
