import { PageComponent } from "./components/page.js";
class App {
  constructor(appRoot) {
    this.content = new PageComponent();
    this.content.attachTo(appRoot);
  }
}
new App(document.querySelector(".contents"));
