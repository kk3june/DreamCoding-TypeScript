export class ImageComponent {
    constructor(contentTitle, contentDesc, url) {
        const template = document.createElement("template");
        template.innerHTML = `<div class="contentItem image">
    <img class="img" src="https://picsum.photos/seed/picsum/300/400"></img>
    <div class="innerContent">
      <div class="contentTitle"></div>
      <div class="contentDesc"></div>
    </div>
    <i class="fa fa-times" aria-hidden="true"></i>
  </div>`;
        this.element = template.content.firstElementChild;
        const imgElement = this.element.querySelector(".img");
        imgElement.src = url;
        const titleElement = this.element.querySelector(".contentTitle");
        titleElement.textContent = contentTitle;
        const descElement = this.element.querySelector(".contentDesc");
        descElement.textContent = contentDesc;
    }
    attachTo(parent, position = "beforeend") {
        parent.insertAdjacentElement(position, this.element);
    }
}
