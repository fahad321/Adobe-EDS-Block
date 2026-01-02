export default function decorate(block) {
  const picture = block.querySelector('picture');
  if (!picture) return;

  const textElements = Array.from(
    block.querySelectorAll('h1, h2, h3, h4, h5, h6, p, ul, ol, a')
  ).filter((element) => !element.closest('picture'));

  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('hero__image');

  const imageInner = document.createElement('div');
  imageInner.classList.add('hero-banner-image');
  imageInner.append(picture);
  imageWrapper.append(imageInner);

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('hero__content');

  const cardWrapper = document.createElement('div');
  cardWrapper.classList.add('hero-card');
  textElements.forEach((element) => cardWrapper.append(element));
  contentWrapper.append(cardWrapper);

  block.innerHTML = '';
  block.append(imageWrapper, contentWrapper);
}
