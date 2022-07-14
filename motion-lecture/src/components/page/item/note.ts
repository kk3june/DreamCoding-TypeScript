import { BaseComponent } from './../../component.js';

export class NoteComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, body: string) {
    super(
      `<section class='note'>
        <h2 class="page-item__title note__title"></h2>  
        <p class='note__body'></p>
      </section>`
    );

    const titleElemnt = this.element.querySelector(
      '.note__title'
    )! as HTMLHeadElement;
    titleElemnt.textContent = title;
    const bodyElemnt = this.element.querySelector(
      '.note__body'
    )! as HTMLHeadElement;
    bodyElemnt.textContent = body;
  }
}
