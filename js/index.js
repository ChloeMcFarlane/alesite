document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('trigger');
    const formBody = document.getElementById('form-body');
  
    // Start collapsed
    formBody.style.height = '0px';
    formBody.style.overflow = 'hidden';
    formBody.style.opacity = '0';
    formBody.style.transition = 'height 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease 0.15s';
  
    trigger.addEventListener('click', () => {
      // Fade out + collapse the trigger button
      trigger.style.transition = 'opacity 0.3s ease, max-height 0.3s ease 0.3s, margin 0.3s ease 0.3s, padding 0.3s ease 0.3s';
      trigger.style.opacity = '0';
      trigger.style.pointerEvents = 'none';
  
      setTimeout(() => {
        trigger.style.maxHeight = '0px';
        trigger.style.margin = '0';
        trigger.style.padding = '0';
        trigger.style.border = 'none';
        trigger.style.overflow = 'hidden';
      }, 300);
  
      // Reveal the form body after button starts fading
      setTimeout(() => {
        const fullHeight = formBody.scrollHeight;
        formBody.style.height = fullHeight + 'px';
        formBody.style.opacity = '1';
  
        // Once transition finishes, let height be auto so it can resize naturally
        formBody.addEventListener('transitionend', () => {
          formBody.style.height = 'auto';
          formBody.style.overflow = 'visible';
        }, { once: true });
      }, 200);
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