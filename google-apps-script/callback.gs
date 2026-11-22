/**
 * Rameshwer Enterprises – "Request a Callback" → Google Sheet
 *
 * Setup:
 * 1. Create a Google Sheet. In row 1 add headers: Timestamp | Name | Phone | Source | Page
 * 2. Extensions → Apps Script. Replace the code with this file and Save.
 * 3. Deploy → New deployment → type "Web app".
 *      Execute as: Me      Who has access: Anyone
 * 4. Authorize, then copy the Web app URL (ends with /exec).
 * 5. Paste it into CALLBACK_SHEET_URL in src/lib/site.ts.
 */
function doPost(e) {
  var lock = LockService.getScriptLock()
  lock.waitLock(10000)
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
    var p = e.parameter || {}
    var clean = function (v) {
      return String(v || '').replace(/^[=+\-@]/, "'$&").slice(0, 200)
    }
    sheet.appendRow([new Date(), clean(p.name), clean(p.phone), clean(p.source), clean(p.page)])
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON)
  } finally {
    lock.releaseLock()
  }
}
