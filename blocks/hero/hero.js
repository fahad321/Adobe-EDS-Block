export default function decorate(block) {
  const picture = block.querySelector('picture');
  const textContainer = block.querySelector('p');
  if (!picture || !textContainer) return;

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

  const link = textContainer.querySelector('a');
  const nodes = Array.from(textContainer.childNodes);
  const textNodes = nodes.filter((node) => {
    if (node === picture) return false;
    if (node === link) return false;
    if (node.nodeType === Node.TEXT_NODE) return true;
    if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === 'BR') return true;
    return false;
  });

  let textBeforeLink = '';
  textNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      textBeforeLink += node.textContent;
    } else if (node.nodeName === 'BR') {
      textBeforeLink += '\n';
    }
  });

  const lines = textBeforeLink
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line);

  if (lines.length > 0) {
    const heading = document.createElement('h4');
    heading.textContent = lines[0];
    cardWrapper.append(heading);
  }

  if (lines.length > 1) {
    const para = document.createElement('p');
    para.textContent = lines.slice(1).join(' ');
    cardWrapper.append(para);
  }

  if (link) {
    cardWrapper.append(link);
  }

  contentWrapper.append(cardWrapper);

  block.innerHTML = '';
  block.append(imageWrapper, contentWrapper);

  const contentHeightTarget = block.querySelector('.hero__content');
  if (contentHeightTarget && typeof ResizeObserver !== 'undefined') {
    const updateHeroOffset = () => {
      const height = contentHeightTarget.offsetHeight;
      document.documentElement.style.setProperty('--hero-content-height', `${height / 2}px`);
    };

    const observer = new ResizeObserver(() => updateHeroOffset());
    observer.observe(contentHeightTarget);
    setTimeout(updateHeroOffset, 100);
  }
}
