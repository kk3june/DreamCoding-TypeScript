export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
  removeFrom(parent: HTMLElement): void;
  // attach api를 생성한 다음 BaseComponent에서 구현하고, 이후 page.ts에서 사용
  attach(component: Component, position?: InsertPosition): void;
}

export class BaseComponent<T extends HTMLElement> implements Component {
  protected readonly element: T;

  constructor(htmlString: string) {
    const template = document.createElement('template');
    template.innerHTML = htmlString;
    this.element = template.content.firstElementChild! as T;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element);
  }

  removeFrom(parent: HTMLElement) {
    if (parent !== this.element.parentElement) {
      throw new Error('Parent mismatch!');
    }
    parent.removeChild(this.element);
  }

  // attach 함수는 전달받은 컴포넌트를 자기 자신(this.element)에게 붙일 것
  attach(component: Component, position?: InsertPosition) {
    component.attachTo(this.element, position);
  }
}
