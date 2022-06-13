import {Component, Host, h, Listen, Element, State} from '@stencil/core';
import { href } from 'stencil-router-v2';
import { Router } from '../router';
import {InternalRouterState} from 'stencil-router-v2/dist/types';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.scss',
  shadow: true,
})
export class AppHeader {
  @Element() el: HTMLElement;
  @State() isOpenMobileNav = false;
  @State() enableMenu = true;

  componentWillLoad() {
    if (Router.url.pathname !== '/') {
      this.enableMenu = false;
    }
    Router.onChange('url', (route: InternalRouterState['url'], _) => {
      this.enableMenu = route.pathname === '/';
    });
  }

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
            <a {...href('/')}><img src="assets/images/logo.svg" alt="西宮・夙川のフレンチレストラン「ル・ベナトン」" decoding="async" /></a>
          </div>
          { this.enableMenu ?
          <nav class={this.isOpenMobileNav ? 'open' : 'hide'}>
            <ul>
              <li><a href="/#menu-reserved">ご予約</a></li>
              <li><a href="/#menu-lunch">ランチ</a></li>
              <li><a href="/#menu-dinner">ディナー</a></li>
              <li><a href="/#menu-wine">ワイン</a></li>
              <li><a href="/#menu-profile">プロフィール</a></li>
              <li><a href="/#menu-contact">お問い合わせ</a></li>
              <li class="inatagram">
                <a href="https://www.instagram.com/le_benaton/" rel="noopener" target="_blank">
                  <img class="svg" src="assets/svg/instagram.svg" alt="instagram" decoding="async" />
                </a>
              </li>
            </ul>
          </nav>
            : '' }

          { this.enableMenu ?
            <button class={this.isOpenMobileNav ? 'active btn-trigger mobile-only' : 'btn-trigger mobile-only'} onClick={this.clickMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
            : '' }
        </header>
      </Host>
    );
  }
}
