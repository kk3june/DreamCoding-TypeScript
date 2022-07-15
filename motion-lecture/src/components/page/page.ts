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
  // 4) muteChildren 생성한 후, sectionContainer를 생성하는 pageItem에서 구현 5)
  muteChildren(state: 'mute' | 'unmute'): void;
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

  // 5) muteChildren 함수 구현
  // state가 mute 라면 class명을 추가 unmute 라면 클래스 삭제
  // => css 작업을 통해 클래스명 추가, 제거에 따라 포인터 이벤트 삭제
  muteChildren(state: 'mute' | 'unmute') {
    if (state === 'mute') {
      this.element.classList.add('mute-children');
    } else {
      this.element.classList.remove('mute-children');
    }
  }
}

export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  private dropTarget?: SectionContainer;
  private dragTarget?: SectionContainer;
  // Set은 중복된 데이터를 가질 수 없는 자료구조( Map에는 중복된 데이터를 가질 수 있다.)
  // 아래에서 addChild가 발생하면 children에 추가했다가
  // closeIcon이 클릭되서 제거될 때(setOnCloseListener) 섹션에서 제거해주면 된다. 1)
  private children = new Set<SectionContainer>();

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
    if (!this.dropTarget) {
      return;
    }
    if (this.dragTarget && this.dragTarget !== this.dropTarget) {
      this.dragTarget.removeFrom(this.element);
      this.dropTarget.attach(this.dragTarget, 'beforebegin');
    }
  }

  addChild(section: Component) {
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
      // 2) 삭제가 될 때는 칠드런에서 delete 해주면 된다.
      // 여기까지하면 children은 삭제되기 전까지는 자신의 자식요소들에 대한 정보를 갖고 있다. 3)
      this.children.delete(item);
    });
    // 1) 칠드런이라는 곳에 추가가 되면 섹션에 추가해주었다가. 2)
    this.children.add(item);
    item.setOnDragStateListener(
      (target: SectionContainer, state: DragState) => {
        // 3) 드래그가 시작하고 멈출 때 모든 포인터 이벤트를 제거해주고 추가해줄 것
        switch (state) {
          case 'start':
            this.dragTarget = target;
            // updateSectons 이라는 함수를 사용하여 드래그가 시작되면 모든 포인터를 mute,
            this.updateSections('mute');
            break;
          case 'stop':
            this.dragTarget = undefined;
            // 드래그가 끝나면 unmute
            this.updateSections('unmute');
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
  // 포인터 이벤트를 제거해줄 updateSections 함수 생성
  // 함수내부에서는 this.children 을 각각 하나씩 반복문을 돌면서 해당하는 내용들을 update 해줄 것
  // 내부에서 section을 인자로 받아오고 모든 섹션 아이템들을 muteChildren 함수를 사용하여
  // 섹션의 모든 자식요소들의 포인터를 mute 하도록 할것
  // ( SectionContainer에서 muteChildren api 구현해야..) 4)
  private updateSections(state: 'mute' | 'unmute') {
    this.children.forEach((section: SectionContainer) => {
      section.muteChildren(state);
    });
  }
}
