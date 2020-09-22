/**
 * ナビゲーションをクリックした時、ハッシュが設定されていたら
 * 目的のIDまでスクロールするスクリプト
 */
const linkScroll = () => {
  const links = document.querySelectorAll('nav a[href]');
  for(const link of links) {
    if (!link.hash) {
      continue;
    }
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Mobileメニューが開いてる時は閉じる
      const mobileMenu = document.querySelector('#mobile-menu-button');
      if (mobileMenu.classList.contains('active')) {
        toggleNav(mobileMenu);
      }

      // スクロール量を計算
      const element = document.querySelector(link.hash);
      const { top } = element.getBoundingClientRect();
      const target = top + window.pageYOffset - 60;
      let position = 0;
      let progress = 0;
      const easeOut = (p) => {
        return p * (2 - p);
      };
      const move = () => {
        progress ++;
        position = target * easeOut(progress / 20);
        window.scrollTo(0, position);
        if (position < target) {
          requestAnimationFrame(move);
        }
      };
      requestAnimationFrame(move);
    })
  }
}

/**
 * モーダルを開くためのイベント
 * @param selector
 */
const openModal = (selector) => {
  try {
    gtag('event', 'select_content', { 'content_type': 'modal' + selector });
  } catch (e) { }

  const innerHtml = document.querySelector(selector).innerHTML;
  const modal = document.querySelector('section.modal-wine-list');
  const modalInner = document.querySelector('section.modal-wine-list > div.modal-wine-list-inner');
  modalInner.innerHTML = innerHtml;
  modal.style.display = 'block';
}

/**
 * モーダルを閉じるためのイベント
 */
const closeModal = () => {
  const modal = document.querySelector('section.modal-wine-list');
  const modalInner = document.querySelector('section.modal-wine-list > div.modal-wine-list-inner');
  modalInner.innerHTML = '';
  modalInner.scrollTop = 0;
  modal.style.display = 'none';
}

/**
 *  クラス `.view_timer` がついていた時、
 *  `data-start-date` 属性、`data-end-date` 属性を
 *  チェックして表示を行う。
 */
const viewTimerHandler = () => {
  const elements = document.querySelectorAll('.view_timer');
  elements.forEach((element) => {
    const start = element.getAttribute('data-start-date');
    const end =  element.getAttribute('data-end-date');
    if (!start && !end) {
      return;
    }
    if (
      new Date().getTime() > new Date(start).getTime() &&
      new Date().getTime() < new Date(end).getTime()
    ) {
      element.style.display = 'list-item';
    }
  });
}

/**
 * モバイルデバイスでハンバーガーメニューを
 * クリックした時にメニューをトグル
 * @param link
 */
const toggleNav = (link) => {
  const nav = document.querySelector('nav');
  if (link.classList.contains('active')) {
    link.classList.remove('active');
    nav.style.display = 'none';
  } else {
    link.classList.add('active');
    nav.style.display = 'block';
  }
}

/**
 * toggleNav() をイベントリスナーで確認
 */
const mobileMenu = () => {
  const link = document.querySelector('#mobile-menu-button');
  link.addEventListener('click', (e) => {
    toggleNav(link);
  }, { passive: true });
}

/**
 * `#menu-reserved` を `#copy-reserved` に
 * まるまるコピーする
 */
const copyReserved = () => {
  document.querySelector('#copy-reserved').innerHTML = document.querySelector('#menu-reserved').innerHTML;
}

/**
 * window.onloadで必要なイベントを実行
 */
window.onload = () => {
  viewTimerHandler();
  mobileMenu();
  copyReserved();
  linkScroll();
};

/**
 * Windowがリサイズされた時、モバイル用メニューの設定をリセット
 */
window.addEventListener("resize", (event) => {
  const nav = document.querySelector('nav');
  const link = document.querySelector('#mobile-menu-button');
  link.classList.remove('active');
  if (document.body.clientWidth > 800) {
    nav.style.display = 'block';
  } else {
    nav.style.display = 'none';
  }
}, { passive: true });

/**
 * スクロール量に応じて、ヘッダーを縮小させるための
 * Classを付与・削除
 */
document.addEventListener('scroll', (e) => {
  const nav = document.querySelector('header');
  let ticking = false;
  if (!ticking) {
    requestAnimationFrame(function() {
      ticking = false;
      const scrollAmount = document.documentElement.scrollTop;

      if (scrollAmount > 120) {
        nav.classList.add('minimum');
      } else if (scrollAmount < 90) {
        nav.classList.remove('minimum');
      }
      // 90-120は何も処理しない
    });
    ticking = true;
  }
}, { passive: true });

/**
 * aタグをクリックした時のイベントを
 * Google Analyticsに送信
 */
document.addEventListener('click', (event) => {
  try {
    const aTag = event.path.find(e => e.localName === 'a');
    if (!aTag || !aTag.href) {
      return;
    }
    const target = aTag.hash ? aTag.hash : aTag.href;
    gtag('event', 'select_content', { 'content_type': target });
  } catch (e) { console.log(e); }
}, { passive: true });
