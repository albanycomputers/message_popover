# Message Popover
Upgrades system messages to use the native HTML Popover API with draggable and resizable toast notifications.

Message Popover replaces the standard Backdrop CMS static message area with interactive, modern notification windows. By leveraging the native Browser Popover API, the module provides high-performance, accessible "toast" messages that stay out of the way of your content while remaining fully functional for developers and site admins.

## Features
- **Native Popover API**: Utilizes modern browser capabilities for overlays, ensuring high performance and native behavior.
- **Draggable Header**: A dedicated 14px "window bar" allows you to move messages anywhere on the screen.
- **Resizable Interface**: Built-in support for standard corner resizing to handle long text or complex debug dumps.
- **Minimalist Footprint**: Developed with vanilla JavaScript and native CSS. This module uses **no external libraries** and the absolute minimum amount of code required.
- **Configurable Debug Mode**: A global toggle to force all messages into "manual" mode, preventing them from closing until explicitly dismissed.
- **Smart Character Limit Persistence**: Automatically detects messages exceeding a defined character limit and keeps them open.
- **Adjustable Auto-Dismiss Time**: Full control over how long standard status messages remain visible.
- **HTMX Ready**: Supports Out-of-Band (OOB) message swaps for dynamic applications.

## Initial version
This is a beta release for code review and testing.

### Requirements:
- Backdrop CMS 1.x
- PHP 8.0+

## Installation:
Install this module using the official Backdrop CMS instructions at https://docs.backdropcms.org/documentation/extend-with-modules

Enable the module.

## Documentation:
**Visit the admin page at** Administration > Configuration > User Interface > Message Popover (admin/config/user-interface/message-popover).

Set options for:
- **Debug Mode**: Force all messages to remain open until manually closed.
- **Auto-Persistence Character Limit**: Define the character count threshold that triggers manual dismissal.
- **Auto-Dismiss Timer**: Set how long standard status messages remain visible in milliseconds.

### Important Behaviours
- The top 14px of every message acts as the drag handle.
- The close button is located in the top-right of the header strip to maximize space for message content.
- Multiple messages will stack vertically but can be moved individually.

## Issues:
Bugs and Feature requests should be reported in the Issue Queue: https://github.com/backdrop-contrib/message_popover/issues

## Current Maintainer(s):
- Steve Moorhouse (albanycomputers) (https://github.com/albanycomputers)
- Additional maintainers and contributors welcomed.

## Credits:
- Steve Moorhouse - Zulip (DrAlbany)
- Google Gemini 3.0 Flash (Paid Tier) acting as a Senior Co-Developer and Security Advisor.

## Sponsorship:
- Albany Computer Services (https://www.albany-computers.co.uk)
- Albany Web Design (https://www.albanywebdesign.co.uk)
- Albany Hosting (https://www.albany-hosting.co.uk)

## License
This project is GPL v2 software. See the LICENSE.txt file in this directory for complete text.