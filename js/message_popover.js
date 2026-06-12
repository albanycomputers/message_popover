(function() {
  'use strict';

  var popoverSupported = typeof HTMLElement.prototype.showPopover === 'function';

  // Single module-scoped drag state consumed by the delegated document
  // listeners below. Per-popover document listeners would accumulate (never
  // removed) and their closures would pin removed elements against GC.
  var dragEl = null;
  var dragOffsetX = 0;
  var dragOffsetY = 0;

  Backdrop.behaviors.messagePopover = {
    attach: function(context, settings) {
      // Core's ajax.js passes a jQuery object as context (e.g. Views UI dialog
      // inserts). attachBehaviors has no try/catch, so calling a native DOM
      // method on it throws and aborts the whole AJAX command chain — the
      // dialog never opens. Normalize to a DOM node before any native call.
      if (context && context.jquery) {
        context = (context.length === 1) ? context[0] : document;
      }
      if (!context || typeof context.querySelectorAll !== 'function') {
        context = document;
      }
      const messages = context.querySelectorAll('[popover].message-popover-item:not(.popover-processed)');
      // 0 is a valid configured value (auto-dismiss disabled) — only fall back
      // to the default when the setting is genuinely absent.
      const dismissTime = (settings.messagePopover && typeof settings.messagePopover.timer !== 'undefined')
        ? settings.messagePopover.timer : 8000;

      messages.forEach((el) => {
        el.classList.add('popover-processed');

        // No Popover API: show as a fixed toast via CSS class instead of
        // silently losing the message. Stacked manually; the delegated click
        // handler below covers the close button (popovertarget is inert here).
        if (!popoverSupported) {
          el.classList.add('popover-fallback');
          stackBelowOpen(el, '.message-popover-item.popover-fallback');
          scheduleAutoDismiss(el, dismissTime);
          return;
        }

        el.addEventListener('beforetoggle', (event) => {
          if (event.newState === 'open') {
            stackBelowOpen(el, '.message-popover-item:popover-open');
          }
        });

        el.addEventListener('toggle', (event) => {
          if (event.newState === 'closed') {
            setTimeout(() => { if (el.parentNode) el.remove(); }, 500);
          }
        });

        el.addEventListener('mousedown', startDrag);

        try {
          el.showPopover();
        } catch (e) {
          el.classList.add('popover-fallback');
        }
        scheduleAutoDismiss(el, dismissTime);
      });
    }
  };

  // Position el below any other currently-visible message popovers.
  function stackBelowOpen(el, selector) {
    const openPopovers = document.querySelectorAll(selector);
    let offset = 65;
    openPopovers.forEach((openEl) => {
      if (openEl !== el) offset += openEl.offsetHeight + 12;
    });
    el.style.insetBlockStart = offset + 'px';
  }

  // Auto-dismiss after the timer; a timer of 0 (or less) disables dismissal.
  function scheduleAutoDismiss(el, dismissTime) {
    if (el.getAttribute('data-auto-dismiss') !== 'true' || dismissTime <= 0) {
      return;
    }
    setTimeout(() => {
      if (document.body.contains(el)) dismiss(el);
    }, dismissTime);
  }

  // Close a message regardless of display mode (popover or fallback toast).
  function dismiss(el) {
    if (el.classList.contains('popover-fallback')) {
      el.remove();
    }
    else if (el.matches(':popover-open')) {
      el.hidePopover();
    }
  }

  // Drag start — bound per element (element listeners die with the element,
  // so no cleanup is needed). Only the top 14px header strip is draggable.
  function startDrag(e) {
    const el = e.currentTarget;
    if (e.target.classList.contains('popover-close')) return;

    const rect = el.getBoundingClientRect();
    if (e.clientY - rect.top > 14) return;

    dragEl = el;
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
    el.style.cursor = 'grabbing';
    el.style.width = el.offsetWidth + 'px';
    el.style.transform = 'none';
    e.preventDefault();
  }

  // Delegated drag listeners — registered exactly once for the document.
  document.addEventListener('mousemove', (e) => {
    if (!dragEl) return;
    dragEl.style.insetInlineStart = (e.clientX - dragOffsetX) + 'px';
    dragEl.style.insetBlockStart = (e.clientY - dragOffsetY) + 'px';
    dragEl.style.insetInlineEnd = 'auto';
  });

  document.addEventListener('mouseup', () => {
    if (dragEl) {
      dragEl.style.cursor = '';
      dragEl = null;
    }
  });

  // popover="manual" does not light-dismiss, so offer Escape to close all
  // visible messages explicitly.
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.message-popover-item.popover-processed').forEach((el) => {
      dismiss(el);
    });
  });

  // Fallback mode: popovertarget close buttons are inert without the Popover
  // API, so handle the click directly.
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.popover-close');
    if (!btn) return;
    const el = btn.closest('.message-popover-item');
    if (el && el.classList.contains('popover-fallback')) {
      el.remove();
    }
  });
})();
