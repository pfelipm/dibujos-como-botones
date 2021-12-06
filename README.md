[![Created with - Google Apps Script](https://img.shields.io/static/v1?label=Created+with&message=Google+Apps+Script&color=blue)](https://developers.google.com/apps-script)
# Toggle drawings used as buttons in Google Sheets

Sample code that shows how to use Google Sheets drawings as conventional UI buttons to invoke Apps Script functions. Code is based on this post ([Switching Buttons for Google Spreadsheet using Google Apps Script](https://tanaikech.github.io/2020/07/27/switching-buttons-for-google-spreadsheet-using-google-apps-script/)) by **Kanshi Tanaike**, that demonstrates different ways of emulating the look and feel of standard buttons inside Google Sheets.

More specifically, this function _very slightly_ improves upon Kanshi's _pattern 1_, where alternate drawings are used as a single button, that nevertheless **requires changing focus** from the current sheet to a temporary one and back again, which causes some flicker, for changes to visually take effect.

![Alternar botones con dibujos HdC](https://user-images.githubusercontent.com/12829262/103150294-02e05700-4773-11eb-868d-c91a9b57a336.gif)

This alternate approach hides drawings (buttons) accordingly by moving them beyond the boundaries of the current sheet. To accomplish that, **large negative offsets** are applied to them using method [setPosition()](https://developers.google.com/apps-script/reference/spreadsheet/drawing#setPosition(Integer,Integer,Integer,Integer)) of class `Drawing`. **This does not require any kind of trick to force update the visual presentation**, apparently not even the use of `SpreadsheetApp.flush()`, unless several updates are required during a single run of the toggle function.

```javascript
// Toggle button status by moving appropiate drawing beyond sheet bounds before processing,
// moving out of sight does not require changing focus to / from another sheet to refresh!
let buttonStatus;
drawings.forEach(d => {
  if (d.getOnAction() == name) {
    // Move button out of sheet
    d.setPosition(1, 1, -1000, -1000);
  }
  else {
    // Restore button to its original position
    d.setPosition(buttonRowCol.row, buttonRowCol.col, 0, 0);
    // Log button status, if used *after* (but not before) 🤔 d.setPosition() in if-branch above some flicker manifests! 
    buttonStatus = d.getOnAction().slice(-3) == '_On' ? 'active' : 'inactive';
  }
});
```

This toggle function supports several buttons in the same sheet, sets their rows and columns as needed, and calls the assigned Apps Script function for each of them.

👉 [Sample spreadsheet](https://docs.google.com/spreadsheets/d/1whLw7VkSExintQyPkah5qoP6j6KY8s_QFHweJC4I0Qg/template/preview) 👈
