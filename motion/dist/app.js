import { ImageComponent } from "./components/item/image.js";
import { PageComponent } from "./components/page.js";
class App {
    constructor(appRoot) {
        this.content = new PageComponent();
        this.content.attachTo(appRoot);
        const image = new ImageComponent("ImageTitle", "This is test image component", "https://picsum.photos/400/300");
        image.attachTo(appRoot, "beforeend");
    }
}
new App(document.querySelector(".contents"));
