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
        progress++;
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

window.onload = () => {
  linkScroll();
};
