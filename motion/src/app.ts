import { ImageComponent } from './components/page/item/image.js';
import { PageComponent } from './components/page/page.js';

class App {
  private readonly content: PageComponent;
  constructor(appRoot: HTMLElement) {
    this.content = new PageComponent();
    this.content.attachTo(appRoot);

    const image = new ImageComponent(
      'ImageTitle',
      'This is test image component',
      'https://picsum.photos/400/300'
    );
    image.attachTo(appRoot, 'beforeend');
  }
}

new App(document.querySelector('.contents') as HTMLElement);
