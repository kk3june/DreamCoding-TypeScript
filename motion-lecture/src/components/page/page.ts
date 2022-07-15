import { BaseComponent, Component } from './../component.js';

export interface Composable {
  addChild(child: Component): void;
}

type OnCloseListener = () => void;
type DragState = 'start' | 'stop' | 'enter' | 'leave';
type OnDragStateListener<T extends Component> = (
  target: T,
  state: DragState
) => void;

interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
}

type SectionContainerConstructor = {
  new (): SectionContainer;
};

export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements SectionContainer
{
  private closeListener?: OnCloseListener;
  private dragStateListener?: OnDragStateListener<PageItemComponent>;
  constructor() {
    super(`<li draggable="true" class="page-item">
            <section class="page-item__body">
              <div class="page-item__controls">
                <button class="close">&times;</button>
              </div>
            </section>
          </li>`);

    const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
    this.element.addEventListener('dragstart', (event: DragEvent) => {
      this.onDragStart(event);
    });
    this.element.addEventListener('dragend', (event: DragEvent) => {
      this.onDragEnd(event);
    });
    this.element.addEventListener('dragenter', (event: DragEvent) => {
      this.onDragEnter(event);
    });
    this.element.addEventListener('dragleave', (event: DragEvent) => {
      this.onDragLeave(event);
    });
  }

  onDragStart(_: DragEvent) {
    this.notifyDragObservers('start');
  }
  onDragEnd(_: DragEvent) {
    this.notifyDragObservers('stop');
  }
  onDragEnter(_: DragEvent) {
    this.notifyDragObservers('enter');
  }
  onDragLeave(_: DragEvent) {
    this.notifyDragObservers('leave');
  }

  notifyDragObservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }

  addChild(child: Component) {
    const container = this.element.querySelector(
      '.page-item__body'
    )! as HTMLElement;

    child.attachTo(container);
  }
  setOncloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }

  setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>) {
    this.dragStateListener = listener;
  }
}

export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  // 1) 페이지 컴포넌트는 아래 2가지 상태를 가지고 있어야 해당 기능은 구현할 수 있다.
  // 이것들을 onDrop 이라는 이벤트에서 원하는 기능을 수행하면 된다. 2)
  private dropTarget?: SectionContainer;
  private dragTarget?: SectionContainer;

  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');
    this.element.addEventListener('dragover', (event: DragEvent) => {
      this.onDragOver(event);
    });
    this.element.addEventListener('drop', (event: DragEvent) => {
      this.onDrop(event);
    });
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    console.log('onDragOver');
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    console.log('onDrop');
    // 2) 여기서 위치를 바꿔줄 것
    // 만약 this.dropTarget이 존재하지 않으면 처리해야할 로직이 없으므로 그냥 return
    if (!this.dropTarget) {
      return;
    }
    // this의 dragTarget이 있으나 현재 드래그 하려는 타겟과 드랍하려는 타겟이 다르다면
    // 로직을 처리할 것 ( 드래그 하려는 타겟과 드랍하려는 타겟이 같을 수 없다. )
    if (this.dragTarget && this.dragTarget !== this.dropTarget) {
      // 현재 드래그하는 타겟을 현재 Page 에서 제거, dropTarget 근처에 생성해줘야 한다.
      this.dragTarget.removeFrom(this.element);
      // 하지만 추가하는 api 가 존재하지 않기 때문에 attach 라는 api 를 만들 것,
      // Component에(!== attatchTo) 3)
      this.dropTarget.attach();
    }
  }

  addChild(section: Component) {
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });
    item.setOnDragStateListener(
      (target: SectionContainer, state: DragState) => {
        // 특정한 Drag가 발생하거나 Drag 한 아이템이 올라오게 되면 페이지 컴포넌트에서 그것들을
        // 기억했다가 drop이라는 이벤트가 발생하면 위치를 변경해줄 것이다. 1)

        // addChild 일때는 각각 start, stop 에서는 drag를 업데이트 하고,
        // enter, leave 일때는 drop을 업데이트 할 것 그리고 drop 이라는 최종적 이벤트가 발생하면
        // 위에 존재하는 onDrop 이벤트
        switch (state) {
          case 'start':
            this.dragTarget = target;
            break;
          case 'stop':
            this.dragTarget = undefined;
            break;
          case 'enter':
            this.dropTarget = target;
            break;
          case 'leave':
            this.dropTarget = undefined;
            break;
          default:
            throw new Error(`unsupported state: ${state}`);
        }
      }
    );
  }
}
