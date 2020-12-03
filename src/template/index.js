let db;

/**
 * ナビゲーションをクリックした時、ハッシュが設定されていたら
 * 目的のIDまでスクロールするスクリプト
 */
const linkScroll = () => {
  const links = document.querySelectorAll('nav a[href]');
  for (const link of links) {
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
        progress++;
        position = target * easeOut(progress / 20);
        window.scrollTo(0, position);
        if (position < target) {
          requestAnimationFrame(move);
        }
      };
      requestAnimationFrame(move);
    });
  }
};

/**
 * モーダルを開くためのイベント
 * @param selector
 */
const openModal = (selector) => {
  try {
    gtag('event', 'select_content', { content_type: 'modal' + selector });
  } catch (e) {}

  const innerHtml = document.querySelector(selector).innerHTML;
  const modal = document.querySelector('section.modal-wine-list');
  const modalInner = document.querySelector('section.modal-wine-list > div.modal-wine-list-inner');
  modalInner.innerHTML = innerHtml;
  modal.style.display = 'block';

  const wineList = modalInner.querySelectorAll('ul > li');
  wineList.forEach((w) => (w.style.display = 'list-item'));

  modalInner.querySelector('form.wine-search-form').addEventListener('submit', (event) => {
    event.preventDefault();
    searchWine(event.target.querySelector('[type=search]').value, event.target.querySelector('[type=hidden]').value);
  });
};

/**
 * モーダルを閉じるためのイベント
 */
const closeModal = () => {
  const modal = document.querySelector('section.modal-wine-list');
  const modalInner = document.querySelector('section.modal-wine-list > div.modal-wine-list-inner');
  modalInner.innerHTML = '';
  modalInner.scrollTop = 0;
  modal.style.display = 'none';
};

/**
 *  クラス `.view_timer` がついていた時、
 *  `data-start-date` 属性、`data-end-date` 属性を
 *  チェックして表示を行う。
 */
const viewTimerHandler = () => {
  const elements = document.querySelectorAll('.view_timer');
  elements.forEach((element) => {
    const start = element.getAttribute('data-start-date');
    const end = element.getAttribute('data-end-date');
    if (!start && !end) {
      return;
    }
    if (new Date().getTime() > new Date(start).getTime() && new Date().getTime() < new Date(end).getTime()) {
      element.style.display = 'list-item';
    }
  });
};

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
};

/**
 * toggleNav() をイベントリスナーで確認
 */
const mobileMenu = () => {
  const link = document.querySelector('#mobile-menu-button');
  link.addEventListener(
    'click',
    (e) => {
      toggleNav(link);
    },
    { passive: true },
  );
};

/**
 * `#menu-reserved` を `#copy-reserved` に
 * まるまるコピーする
 */
const copyReserved = () => {
  document.querySelector('#copy-reserved').innerHTML = document.querySelector('#menu-reserved').innerHTML;
};

const getUserId = () => {
  let analyticsId = localStorage.getItem('analyticsId');
  if (!analyticsId) {
    analyticsId = new Date().getTime();
    localStorage.setItem('analyticsId', 'id' + analyticsId);
  }
  return analyticsId;
};

const $recordAccess = async (userId) => {
  const ref = db.collection('access').doc(userId);
  return ref.set({
    timestamp: new Date().getTime(),
  });
};

const $recordConversion = (userId) => {
  const ref = db.collection('conversion').doc(userId);
  return ref.set({
    timestamp: new Date().getTime(),
  });
};

const $refinementRecord = async () => {
  const accessSnapshot = await db
    .collection('access')
    .where('timestamp', '>', new Date(new Date() - 1000 * 60 * 15).getTime())
    .get();

  const conversionSnapshot = await db
    .collection('conversion')
    .where('timestamp', '>', new Date(new Date() - 1000 * 60 * 60 * 24).getTime())
    .get();

  return {
    dayAccess: accessSnapshot.docs.length,
    dayConversion: conversionSnapshot.docs.length,
  };
};

const reflectRecord = (record) => {
  if (record.dayAccess > 0) {
    document.querySelector('#recordAccess span.record').innerHTML = record.dayAccess;
  } else {
    const el = document.querySelector('#recordAccess');
    el.parentNode.removeChild(el);
  }

  if (record.dayConversion > 0) {
    document.querySelector('#conversionAccess span.record').innerHTML = record.dayConversion;
  } else {
    const el = document.querySelector('#conversionAccess');
    el.parentNode.removeChild(el);
  }

  const element = document.querySelectorAll('.toast');
  for (let i = 0; i < element.length; i++) {
    setTimeout(() => (element[i].style.display = 'block'), 2000 * (i + 1));
    setTimeout(() => (element[i].style.display = 'none'), 2000 * (i + 1) + 10000);
  }
};

/**
 * window.onloadで必要なイベントを実行
 */
window.onload = async () => {
  try {
    firebase.initializeApp({
      apiKey: 'AIzaSyDZX9RvCWbBOiRl0_heOshMEFUiI9QqD0g',
      authDomain: 'benaton-japan.firebaseapp.com',
      projectId: 'benaton-japan',
    });
    db = firebase.firestore();
    $recordAccess(getUserId());
  } catch (e) {
    console.log(e);
  }

  viewTimerHandler();
  mobileMenu();
  copyReserved();
  linkScroll();
  setTimeout(() => {
    $refinementRecord().then((data) => reflectRecord(data));
  }, 5000);

  // ABテスト確認用
  // const isOptimize = getParam('optimize');
  // if (isOptimize === '1') {
  // }
};

function getParam(name) {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * Windowがリサイズされた時、モバイル用メニューの設定をリセット
 */
window.addEventListener(
  'resize',
  (event) => {
    const nav = document.querySelector('nav');
    const link = document.querySelector('#mobile-menu-button');
    link.classList.remove('active');
    if (document.body.clientWidth > 800) {
      nav.style.display = 'block';
    } else {
      nav.style.display = 'none';
    }
  },
  { passive: true },
);

/**
 * スクロール量に応じて、ヘッダーを縮小させるための
 * Classを付与・削除
 */
document.addEventListener(
  'scroll',
  (e) => {
    const nav = document.querySelector('header');
    let ticking = false;
    if (!ticking) {
      requestAnimationFrame(function () {
        ticking = false;
        const scrollAmount = document.documentElement.scrollTop;

        if (scrollAmount > 60) {
          nav.classList.add('minimum');
        } else if (scrollAmount < 30) {
          nav.classList.remove('minimum');
        }
      });
      ticking = true;
    }
  },
  { passive: true },
);

/**
 * aタグをクリックした時のイベントを
 * Google Analyticsに送信
 */
document.addEventListener(
  'click',
  (event) => {
    try {
      const path = event.path || (event.composedPath && event.composedPath());
      const aTag = path.find((e) => e.localName === 'a');
      if (!aTag || !aTag.href) {
        return;
      }
      const target = aTag.hash ? aTag.hash : aTag.href;
      gtag('event', 'select_content', { content_type: target });

      if (target.includes('reserve.resebook.jp') || target.includes('0798-37-2655')) {
        $recordConversion(getUserId());
      }
    } catch (e) {
      console.log(e);
    }
  },
  { passive: true },
);

document.addEventListener(
  'click',
  (event) => {
    try {
      const path = event.path || (event.composedPath && event.composedPath());
      const toastTag = path.find((e) => e.className === 'toast');
      if (!toastTag) {
        return;
      }
      toastTag.style.display = 'none';
    } catch (e) {
      console.log(e);
    }
  },
  { passive: true },
);
