import { BaseComponent } from '../../component.js';

export class ImageComponent extends BaseComponent<HTMLElement> {
  constructor(contentTitle: string, contentDesc: string, url: string) {
    super(`<div class="contentItem image">
    <img class="img" src=""></img>
    <div class="innerContent">
      <div class="contentTitle"></div>
      <div class="contentDesc"></div>
    </div>
    <i class="fa fa-times" aria-hidden="true"></i>
  </div>`);

    const imgElement = this.element.querySelector('.img') as HTMLImageElement;
    imgElement.src = url;

    const titleElement = this.element.querySelector(
      '.contentTitle'
    ) as HTMLElement;
    titleElement.textContent = contentTitle;
    const descElement = this.element.querySelector(
      '.contentDesc'
    ) as HTMLElement;
    descElement.textContent = contentDesc;
  }
}
