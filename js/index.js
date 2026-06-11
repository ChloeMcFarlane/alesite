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