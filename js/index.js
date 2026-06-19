document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.getElementById('trigger');
  const formBody = document.getElementById('form-body');

  // Form body starts collapsed
  formBody.style.cssText = [
    'height: 0px',
    'opacity: 0',
    'transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.08s, opacity 0.5s ease 0.25s',
  ].join(';');

  trigger.addEventListener('click', () => {
    // Button shrinks/fades away AND collapses its own space — no layout jump
    trigger.classList.add('is-hiding');
    trigger.addEventListener('transitionend', () => {
      trigger.style.display = 'none';
    }, { once: true });

    // Form expands right behind it, slightly staggered so it reads as one motion
    const fullHeight = formBody.scrollHeight;
    formBody.style.height = fullHeight + 'px';
    formBody.style.opacity = '1';

    formBody.addEventListener('transitionend', (e) => {
      if (e.propertyName !== 'height') return;
      formBody.style.height = 'auto';
      formBody.style.overflow = 'visible';
    }, { once: true });
  });
});

/* ------------------------------------------------------------------
 CUSTOM CURSOR
------------------------------------------------------------------ */
(function () {
const isFinePointer = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
if (!isFinePointer) return;

const cursor = document.createElement("div");
cursor.classList.add("custom-cursor");
document.body.appendChild(cursor);

const styleEl = document.createElement("style");
styleEl.textContent = `
  @media (pointer: fine) and (hover: hover) {
    *, *::before, *::after { cursor: none !important; }
  }
`;
document.head.appendChild(styleEl);

let mouseX = 0;
let mouseY = 0;
let isVisible = false;

function loop() {
  // Always read actual rendered size so center stays locked regardless of CSS transitions
  const half = cursor.offsetWidth / 2;
  cursor.style.left = (mouseX - half) + "px";
  cursor.style.top  = (mouseY - half) + "px";
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

function showCursor() {
  if (!isVisible) {
    cursor.classList.add("custom-cursor--init");
    isVisible = true;
  }
}
function hideCursor() {
  cursor.classList.remove("custom-cursor--init");
  isVisible = false;
}

function addLinkListeners() {
  document.querySelectorAll("a, button, [role='button'], input, textarea, select").forEach((el) => {
    if (el._cursorBound) return;
    el._cursorBound = true;
    el.addEventListener("mouseenter", () => cursor.classList.add("custom-cursor--link"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("custom-cursor--link"));
  });
}

addLinkListeners();
new MutationObserver(addLinkListeners).observe(document.body, { childList: true, subtree: true });

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  showCursor();
});

document.addEventListener("mouseleave", hideCursor);
document.addEventListener("mouseenter", showCursor);
})();