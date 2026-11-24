# SematIn

SematIn is a browser extension for saving and reusing text or table templates. Templates can be filled into the active text field, web editor, or WhatsApp Web.

## Features

- Create, edit, delete, and categorize templates.
- Mark templates as favorites to keep them at the top of the list.
- Duplicate templates to create independent editable copies.
- Favorites appear first; other templates retain their saved order.
- Search templates by title, category, or content.
- Preview templates directly from the list.
- Select formatted text on a webpage, right-click, and choose **Add to SematIn** to open the template form in the configured popup or sidebar, with the selection formatting preserved. If the popup closes, reopening SematIn restores the editor draft.
- Create formatted content with text styling, lists, tables, horizontal lines, and alignment.
- Use variables such as `{{name}}` and fill in their values before applying a template.
- Get a confirmation when variables are still empty before applying a template.
- Use automatic variables such as `{{tanggal_hari_ini}}`, `{{bulan_tahun}}`, `{{hari_ini}}`, and `{{waktu_sekarang}}`.
- Import multiple `.xlsx` or `.xls` datasets for each template from its variable modal; choose a worksheet when needed, and map first-row headers to variable names with spaces replaced by underscores. The modal shows each imported file and its total row count, and previews the next row in the variable fields without advancing progress. Excel date cells are formatted as `29 November 2026`. Progress starts at `0/N`; **Apply** closes the preview, while **Use** fills and pastes the next row. Per-file progress bars appear below the template actions, and each dataset is cleared automatically after its last row. When data is queued, **Use** fills and pastes the next row without opening the variable modal.
- Import or export templates as JSON from **Settings → Backup**.
- Restore the template collection captured automatically before a template is deleted.
- Choose between light and dark themes.
- Choose whether SematIn opens as a popup (the default) or in the browser sidebar.
- Check GitHub for the latest SematIn release.

## Development installation

1. Download or clone this repository.
2. Open your browser's extensions page:
   - Chrome: `chrome://extensions`
   - Microsoft Edge: `edge://extensions`
3. Enable **Developer mode**.
4. Select **Load unpacked** and choose the SematIn folder containing `manifest.json`.
5. After changing extension files, reload the extension from the same page.

This extension consists of static files and does not require a build process or dependency installation.

## Usage

1. Open the SematIn popup and select **New** to create a template.
2. Enter a title and content. A category is optional.
3. To add a variable, insert a placeholder in the `{{variable_name}}` format.
4. Save the template.
5. On the destination page, focus the text field or editor, open SematIn from the toolbar (as a popup by default, or in the sidebar if selected in Settings), and select **Use**.
6. If the template contains variables, fill in their values and select **Apply**.

On WhatsApp Web, templates are converted to text suitable for the message field. Formatting support depends on the editor and website being used.

## Data and permissions

Templates, categories, theme preferences, display mode, drafts, and imported Excel rows and progress are stored locally in the browser using `chrome.storage.local` until the imported data is cleared. The extension uses the `activeTab` and `scripting` permissions to fill templates into the active tab, the Side Panel API to offer sidebar mode on supported Chrome (114+) and Edge versions, and connects to the GitHub API to check for releases. The content script is registered on web pages (`<all_urls>`); review browser permissions before installing the extension.

The automatic backup is updated only when a template is deleted. It stores the template collection as it was immediately before deletion and can be restored via **Settings → Restore**. This backup is also deleted if extension or browser data is removed; use **Settings → Backup → Export** to keep a separate copy.

## File structure

- `manifest.json` — extension metadata, permissions, and configuration.
- `background.js` — restores the selected popup or sidebar mode.
- `sidebar.html`, `sidebar.css` — responsive sidebar shell and layout.
- `popup.html`, `popup.css`, `popup.js` — popup interface and template management.
- `excel-import.js`, `vendor/` — Excel parsing utilities, SheetJS CE 0.20.3, and its Apache-2.0 license.
- `content.js` — fills templates into the active page.
- `icons/` — extension icons.
