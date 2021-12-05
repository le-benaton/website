import {Component, Host, h, Listen, Element} from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.scss',
  shadow: true,
})
export class AppHeader {
  @Element() el: HTMLElement;

  @Listen('resize', {target: 'window'})
  resizeWindow(ev) {
    const nav = this.el.shadowRoot.querySelector('nav');
    const link = this.el.shadowRoot.querySelector('#mobile-menu-button');
    link.classList.remove('active');
    if (ev.target.body.clientWidth > 800) {
      nav.style.display = 'block';
    } else {
      nav.style.display = 'none';
    }
  }

  @Listen('scroll', {target: 'window'})
  resizeHeader(ev) {
    const nav = this.el.shadowRoot.querySelector('header');
    let ticking = false;
    if (!ticking) {
      requestAnimationFrame(function () {
        ticking = false;
        const scrollAmount = ev.target.documentElement.scrollTop;

        if (scrollAmount > 60) {
          nav.classList.add('minimum');
        } else if (scrollAmount < 30) {
          nav.classList.remove('minimum');
        }
      });
      ticking = true;
    }
  }

  clickMobileMenu = (ev: any) => {
    this.toggleNav(ev.srcElement);
  };

  linkScroll = (ev: any) => {
    ev.preventDefault();
    // Mobileメニューが開いてる時は閉じる
    const mobileMenu = this.el.shadowRoot.querySelector('#mobile-menu-button');
    if (mobileMenu.classList.contains('active')) {
      this.toggleNav(mobileMenu);
    }

    /**
     * スクロール量を計算。
     * 他コンポーネントのため、ducumentから検索
     */
    const element = document.querySelector(ev.srcElement.hash);
    const { top } = element.getBoundingClientRect();
    const target = top + window.scrollY;
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
    const nav = this.el.shadowRoot.querySelector('nav');
    if (link.classList.contains('active')) {
      link.classList.remove('active');
      nav.style.display = 'none';
    } else {
      link.classList.add('active');
      nav.style.display = 'block';
    }
  };

  render() {
    return (
      <Host>
        <header>
          <div class="logo">
            <a href="index.html"><img src="assets/images/logo.png" alt="西宮・夙川のフレンチレストラン「ル・ベナトン」"/></a>
          </div>
          <nav>
            <ul>
              <li><a href="#menu-reserved" onClick={this.linkScroll}>ご予約</a></li>
              <li><a href="#menu-lunch" onClick={this.linkScroll}>ランチ</a></li>
              <li><a href="#menu-dinner" onClick={this.linkScroll}>ディナー</a></li>
              <li><a href="#menu-wine" onClick={this.linkScroll}>ワイン</a></li>
              <li><a href="#menu-profile" onClick={this.linkScroll}>プロフィール</a></li>
              <li><a href="#menu-contact" onClick={this.linkScroll}>お問い合わせ</a></li>
              <li class="inatagram">
                <a href="https://www.instagram.com/le_benaton/" rel="noopener" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                    <title>ionicons-v5_logos</title>
                    <path
                      d="M349.33,69.33a93.62,93.62,0,0,1,93.34,93.34V349.33a93.62,93.62,0,0,1-93.34,93.34H162.67a93.62,93.62,0,0,1-93.34-93.34V162.67a93.62,93.62,0,0,1,93.34-93.34H349.33m0-37.33H162.67C90.8,32,32,90.8,32,162.67V349.33C32,421.2,90.8,480,162.67,480H349.33C421.2,480,480,421.2,480,349.33V162.67C480,90.8,421.2,32,349.33,32Z"
                    />
                    <path d="M377.33,162.67a28,28,0,1,1,28-28A27.94,27.94,0,0,1,377.33,162.67Z"/>
                    <path
                      d="M256,181.33A74.67,74.67,0,1,1,181.33,256,74.75,74.75,0,0,1,256,181.33M256,144A112,112,0,1,0,368,256,112,112,0,0,0,256,144Z"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
          <button class="btn-trigger mobile-only" id="mobile-menu-button" onClick={this.clickMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </header>
      </Host>
    );
  }
}
