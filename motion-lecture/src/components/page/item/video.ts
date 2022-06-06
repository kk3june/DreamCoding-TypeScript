import { BaseComponent } from './../../component.js';

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`
    <section class="'video">
      <div class="video__player"><iframe class="video__iframe"></iframe></div>
      <h3 class="video__title"></h3>
    </section>`);

    const iframe = this.element.querySelector(
      '.video__iframe'
    )! as HTMLIFrameElement;
    iframe.src = this.convertToEmbeddedURL(url);

    const titleElemnt = this.element.querySelector(
      '.video__title'
    )! as HTMLHeadingElement;
    titleElemnt.textContent = title;
  }

  // 내부적으로만 사용할 것이므로 private
  // url 들을 string 형태로 받아서 임베디드용으로 변환된 string을 리턴
  private convertToEmbeddedURL(url: string): string {
    // 변수 regExp 에 정규표현식을 활용하여 video의 id 값을 가져오고
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    // 전달받은 url은 String 에 정의된 match API를 이용, 전달받은 정규 표현식과 매칭되는 것이 있다면 배열 형태로 보내준다.
    const match = url.match(regExp);

    const videoId = match ? match[1] || match[2] : undefined;
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}

// <iframe width="1280" height="720" src="https://www.youtube.com/embed/8aGhZQkoFbQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
