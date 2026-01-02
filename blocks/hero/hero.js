export default function decorate(block) {
  // Find the paragraph containing the image and text
  const p = block.querySelector('p');
  if (!p) return;

  // Extract the image
  const picture = p.querySelector('picture');

  // Create wrappers
  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('hero-image');
  if (picture) {
    imageWrapper.append(picture);
  }

  const cardWrapper = document.createElement('div');
  cardWrapper.classList.add('hero-card');

  // Process text nodes and links to create proper structure
  const nodes = Array.from(p.childNodes);
  const link = p.querySelector('a');

  // Collect all text nodes before the link (excluding picture)
  const textNodes = nodes.filter((node) => {
    if (node === picture) return false;
    if (node === link) return false;
    if (node.nodeType === Node.TEXT_NODE) return true;
    if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === 'BR') return true;
    return false;
  });

  // Get all text content before the link
  let textBeforeLink = '';
  textNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      textBeforeLink += node.textContent;
    } else if (node.nodeName === 'BR') {
      textBeforeLink += '\n';
    }
  });

  // Split by line breaks and filter empty lines
  const lines = textBeforeLink.split(/\n+/).map((line) => line.trim()).filter((line) => line);

  // First line is heading, rest is paragraph
  if (lines.length > 0) {
    const h4 = document.createElement('h4');
    const [firstLine] = lines;
    h4.textContent = firstLine;
    cardWrapper.append(h4);
  }

  if (lines.length > 1) {
    const para = document.createElement('p');
    para.textContent = lines.slice(1).join(' ');
    cardWrapper.append(para);
  }

  // Add link/button if it exists
  if (link) {
    cardWrapper.append(link);
  }

  // Replace the original <p> with our two wrappers
  const inner = p.closest('div');
  const outer = inner.parentElement;
  inner.remove();
  outer.append(imageWrapper, cardWrapper);
  outer.classList.add('hero-wrapper');
}
