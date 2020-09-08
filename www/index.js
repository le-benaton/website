const linkScroll = () => {
  const links = document.querySelectorAll('nav a[href]');
  for(const link of links) {
    if (!link.hash) {
      continue;
    }
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const element = document.querySelector(link.hash);
      const rect = element.getBoundingClientRect();
      const target = rect.top + window.pageYOffset;
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

        // Mobileの場合はMenuをtoggle
        if (position === target) {
          const mobileMenu = document.querySelector('#mobile-menu-button');
          if (mobileMenu.classList.contains('active')) {
            toggleNav(mobileMenu);
          }
        }
      };
      requestAnimationFrame(move);
    })
  }
}

const openModal = (selector) => {
  const innerHtml = document.querySelector(selector).innerHTML;
  console.log(innerHtml);
  const modal = document.querySelector('section.modal-wine-list');
  const modalInner = document.querySelector('section.modal-wine-list > div.modal-wine-list-inner');
  modalInner.innerHTML = innerHtml;
  modal.style.display = 'block';
}

const closeModal = () => {
  const modal = document.querySelector('section.modal-wine-list');
  const modalInner = document.querySelector('section.modal-wine-list > div.modal-wine-list-inner');
  modalInner.innerHTML = '';
  modalInner.scrollTop = 0;
  modal.style.display = 'none';
}

const viewTimerHandler = () => {
  const elements = document.querySelectorAll('.view_timer');
  elements.forEach((element) => {
    const start = element.getAttribute('data-start-date');
    const end =  element.getAttribute('data-end-date');
    if (!start && !end) {
      return;
    }

    if (new Date().getTime() > new Date(start).getTime()) {
      element.style.display = 'list-item';
    }

    if (new Date().getTime() < new Date(end).getTime()) {
      element.style.display = 'list-item';
    }
  });
}

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

const mobileMenu = () => {
  const link = document.querySelector('#mobile-menu-button');
  link.addEventListener('click', (e) => {
    e.preventDefault();
    toggleNav(link);
  });
}

window.onload = () => {
  linkScroll();
  viewTimerHandler();
  mobileMenu();
};
