(function() {
  'use strict';

  Backdrop.behaviors.messagePopover = {
    attach: function(context, settings) {
      const messages = context.querySelectorAll('[popover].message-popover-item:not(.popover-processed)');
      const dismissTime = (settings.messagePopover && settings.messagePopover.timer) || 8000;

      messages.forEach((el) => {
        el.classList.add('popover-processed');

        el.addEventListener('beforetoggle', (event) => {
          if (event.newState === 'open') {
            const openPopovers = document.querySelectorAll('.message-popover-item:popover-open');
            let offset = 65;
            openPopovers.forEach((openEl) => {
              if (openEl !== el) offset += openEl.offsetHeight + 12;
            });
            el.style.insetBlockStart = offset + 'px';
          }
        });

        el.addEventListener('toggle', (event) => {
          if (event.newState === 'closed') {
            setTimeout(() => { if (el.parentNode) el.remove(); }, 500);
          }
        });

        makeDraggable(el);

        try {
          el.showPopover();
          if (el.getAttribute('data-auto-dismiss') === 'true') {
            setTimeout(() => {
              if (document.body.contains(el) && el.matches(':popover-open')) el.hidePopover();
            }, dismissTime);
          }
        } catch (e) {}
      });
    }
  };

  function makeDraggable(el) {
    let isDragging = false;
    let offsetX, offsetY;

    el.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('popover-close')) return;

      const rect = el.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;

      if (relativeY <= 14) {
        isDragging = true;
        // Visual feedback for dragging
        el.style.cursor = 'grabbing';
        el.style.width = el.offsetWidth + 'px';
        el.style.transform = 'none';
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        e.preventDefault();
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      el.style.insetInlineStart = (e.clientX - offsetX) + 'px';
      el.style.insetBlockStart = (e.clientY - offsetY) + 'px';
      el.style.insetInlineEnd = 'auto';
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        // Reset to default cursor handled by CSS
        el.style.cursor = '';
      }
    });
  }
})();