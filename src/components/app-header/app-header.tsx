import { Component, Host, h, getAssetPath } from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css',
  shadow: false,
})
export class AppHeader {
  render() {
    return (
      <Host>
        <header>
          <div class="logo">
            <a href="index.html"><img src="assets/images/logo.png" alt="西宮・夙川のフレンチレストラン「ル・ベナトン」"/></a>
          </div>
          <nav>
            <ul>
              <li><a href="index.html#menu-reserved">ご予約</a></li>
              <li><a href="index.html#menu-lunch">ランチ</a></li>
              <li><a href="index.html#menu-dinner">ディナー</a></li>
              <li><a href="index.html#menu-wine">ワイン</a></li>
              <li><a class="nav-profile" href="index.html#menu-profile">プロフィール</a></li>
              <li><a href="index.html#menu-contact">お問い合わせ</a></li>
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
          <div class="mobile-only">
            <button class="btn-trigger" id="mobile-menu-button">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </header>
      </Host>
    );
  }

}
