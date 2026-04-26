(function ($) {
  'use strict';

  Backdrop.behaviors.messagePopover = {
    attach: function (context, settings) {
      // Safely wrap context in jQuery to avoid "querySelectorAll is not a function"
      const $messages = $(context).find('.message-popover-item').not('.popover-processed');

      if (!$messages.length) {
        return;
      }

      const dismissTime = (settings.messagePopover && settings.messagePopover.timer) || 8000;

      $messages.each(function () {
        const el = this;
        $(el).addClass('popover-processed');

        // Defensive check: Ensure Popover API exists and element is still in DOM
        if (typeof el.showPopover !== 'function' || !document.body.contains(el)) {
          return;
        }

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
              if (document.body.contains(el) && el.matches(':popover-open')) {
                el.hidePopover();
              }
            }, dismissTime);
          }
        } catch (e) {
          console.warn('Message Popover could not be displayed:', e);
        }
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
        el.style.cursor = 'grabbing';

        el.style.insetInlineStart = rect.left + 'px';
        el.style.insetBlockStart = rect.top + 'px';
        el.style.transform = 'none';
        el.style.margin = '0';
        el.style.width = rect.width + 'px';

        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        e.preventDefault();
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      el.style.insetInlineStart = (e.clientX - offsetX) + 'px';
      el.style.insetBlockStart = (e.clientY - offsetY) + 'px';
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        el.style.cursor = '';
      }
    });
  }
})(jQuery);