export class ImageComponent {
  private element: HTMLElement;
  constructor(contentTitle: string, contentDesc: string, url: string) {
    const template = document.createElement("template");
    template.innerHTML = `<div class="contentItem image">
    <img class="img" src="https://picsum.photos/seed/picsum/300/400"></img>
    <div class="innerContent">
      <div class="contentTitle"></div>
      <div class="contentDesc"></div>
    </div>
    <i class="fa fa-times" aria-hidden="true"></i>
  </div>`;
    this.element = template.content.firstElementChild as HTMLElement;
    const imgElement = this.element.querySelector(".img") as HTMLImageElement;
    imgElement.src = url;

    const titleElement = this.element.querySelector(
      ".contentTitle"
    ) as HTMLElement;
    titleElement.textContent = contentTitle;
    const descElement = this.element.querySelector(
      ".contentDesc"
    ) as HTMLElement;
    descElement.textContent = contentDesc;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = "beforeend") {
    parent.insertAdjacentElement(position, this.element);
  }
}
