let db;


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
  if (record.dayAccess > 1) {
    document.querySelector('#recordAccess span.record').innerHTML = record.dayAccess;
  } else {
    const el = document.querySelector('#recordAccess');
    el.parentNode.removeChild(el);
  }

  if (record.dayConversion > 1) {
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
 * スクロール量に応じて、ヘッダーを縮小させるための
 * Classを付与・削除
 */


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
