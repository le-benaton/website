import {Component, Host, h, Listen, Element, State} from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.scss',
  shadow: true,
})
export class AppHeader {
  @Element() el: HTMLElement;
  @State() isOpenMobileNav = false;

  @Listen('resize', {target: 'window'})
  resizeWindow() {
    this.isOpenMobileNav = window.innerWidth > 800;
  }

  @Listen('scroll', {target: 'window'})
  resizeHeader() {
    const nav = this.el.shadowRoot.querySelector('header');
    const scrollAmount = window.scrollY;
    if (scrollAmount > 60) {
      nav.classList.add('minimum');
    } else if (scrollAmount < 30) {
      nav.classList.remove('minimum');
    }
  }

  clickMobileMenu = (ev: any) => {
    this.toggleNav(ev.srcElement);
  };

  linkScroll = (ev: any) => {
    ev.preventDefault();
    // Mobileメニューが開いてる時は閉じる
    this.isOpenMobileNav = false;

    /**
     * スクロール量を計算。
     * 他コンポーネントのため、ducumentから検索
     */
    const element = document.querySelector(ev.srcElement.hash);
    const { top } = element.getBoundingClientRect();
    const target = top + window.scrollY - 44;
    let position = 0;
    let progress = 0;
    const easeOut = (p) => {
      return p * (2 - p);
    };
    const move = () => {
      progress++;
      position = target * easeOut(progress / 20);
      window.scrollTo(0, position);
      if (position < target) {
        requestAnimationFrame(move);
      }
    };
    requestAnimationFrame(move);
  };

  toggleNav = (link: Element) => {
    if (link.classList.contains('active')) {
      link.classList.remove('active');
      this.isOpenMobileNav = false;
    } else {
      link.classList.add('active');
      this.isOpenMobileNav = true;
    }
  };

  render() {
    return (
      <Host>
        <header>
          <div class="logo">
            <a href="/"><img src="assets/images/logo.svg" alt="西宮・夙川のフレンチレストラン「ル・ベナトン」" decoding="async" /></a>
          </div>
          <nav class={this.isOpenMobileNav ? 'open' : 'hide'}>
            <ul>
              <li><a href="/#menu-reserved" onClick={this.linkScroll}>ご予約</a></li>
              <li><a href="/#menu-lunch" onClick={this.linkScroll}>ランチ</a></li>
              <li><a href="/#menu-dinner" onClick={this.linkScroll}>ディナー</a></li>
              <li><a href="/#menu-wine" onClick={this.linkScroll}>ワイン</a></li>
              <li><a href="/#menu-profile" onClick={this.linkScroll}>プロフィール</a></li>
              <li><a href="/#menu-contact" onClick={this.linkScroll}>お問い合わせ</a></li>
              <li class="inatagram">
                <a href="https://www.instagram.com/le_benaton/" rel="noopener" target="_blank">
                  <svg>
                    <use xlinkHref="assets/svg/instagram.svg#symbol"></use>
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
          <button class={this.isOpenMobileNav ? 'active btn-trigger mobile-only' : 'btn-trigger mobile-only'} onClick={this.clickMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </header>
      </Host>
    );
  }
}
