# Message Popover
Upgrades system messages to use the native HTML Popover API with draggable and resizable toast notifications.

Message Popover replaces the standard Backdrop CMS static message area with interactive, modern notification windows. By leveraging the native Browser Popover API, the module provides high-performance, accessible "toast" messages that stay out of the way of your content while remaining fully functional for developers and site admins.

## Features
- **Native Popover API**: Utilises modern browser capabilities for overlays, ensuring high performance and native behaviour.
- **Graceful Fallback**: On browsers without the Popover API, messages display as fixed toast notifications instead of being lost.
- **Draggable Header**: A dedicated 14px "window bar" allows you to move messages anywhere on the screen.
- **Resizable Interface**: Built-in support for standard corner resizing to handle long text or complex debug dumps.
- **Message Stacking**: Multiple simultaneous messages stack vertically and can be moved individually.
- **Keyboard Dismissal**: Press Escape to close all visible messages at once.
- **Accessible**: Messages carry role="alert"/role="status" and a hidden severity label for screen readers.
- **Minimalist Footprint**: Developed with vanilla JavaScript and native CSS. This module uses **no external libraries** and the absolute minimum amount of code required.
- **Configurable Debug Mode**: A global toggle to force all messages to stay open until explicitly dismissed.
- **Smart Character Limit Persistence**: Automatically detects messages exceeding a defined character limit and keeps them open.
- **Adjustable Auto-Dismiss Time**: Full control over how long standard status messages remain visible. Set to 0 to disable auto-dismiss entirely.
- **Subdirectory-Safe Icons**: Severity icons resolve via base_path(), working on any install location.
- **HTMX Ready**: Supports Out-of-Band (OOB) message swaps for dynamic applications.

### Requirements:
- Backdrop CMS 1.x
- PHP 8.0+ (This is a hard requirement: the code uses PHP 8.0 functions such as str_contains() and will not run on PHP 7.4 or earlier. We strictly require PHP 8.0+ and will not address issues related to older PHP versions.)

## Installation:
Install this module using the official Backdrop CMS instructions at https://docs.backdropcms.org/documentation/extend-with-modules

Enable the module.

## Documentation:
**Visit the admin page at** Administration > Configuration > User Interface > Message Popover (admin/config/user-interface/message-popover).

Set options for:
- **Debug Mode**: Force all messages to remain open until manually closed.
- **Auto-Persistence Character Limit**: Define the character count threshold that triggers manual dismissal. Set to 0 to disable.
- **Auto-Dismiss Timer**: Set how long standard status messages remain visible in milliseconds. Set to 0 to disable auto-dismiss (all messages stay until closed).

### Important Behaviours
- The top 14px of every message acts as the drag handle.
- The close button is located in the top-right of the header strip to maximise space for message content.
- Multiple messages will stack vertically but can be moved individually.
- Error messages, debug dumps, and messages over the character limit stay open until dismissed; other messages auto-dismiss after the configured timer.
- Pressing Escape closes all visible messages.
- On browsers without the Popover API, messages appear as fixed toasts with a working close button — no message is ever silently lost.

## Issues:
Bugs and Feature requests should be reported in the Issue Queue: https://github.com/backdrop-contrib/message_popover/issues

## Current Maintainer(s):
- Steve Moorhouse (albanycomputers) (https://github.com/albanycomputers)
- Additional maintainers and contributors welcomed.

## Credits:
- Steve Moorhouse - Zulip (DrAlbany)
- Claude AI

## Sponsorship:
- Albany Computer Services (https://www.albany-computers.co.uk)
- Albany Web Design (https://www.albanywebdesign.co.uk)
- Albany Hosting (https://www.albany-hosting.co.uk)

## License
This project is GPL v2 software. See the LICENSE.txt file in this directory for complete text.