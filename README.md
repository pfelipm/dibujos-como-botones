# Toggle drawings used as buttons in Google Sheets

Sample code that shows how to use Google Sheets drawings as buttons to invoke Apps Script functions. Code is based on this post ([Switching Buttons for Google Spreadsheet using Google Apps Script](https://tanaikech.github.io/2020/07/27/switching-buttons-for-google-spreadsheet-using-google-apps-script/)) by Kanshi TANAIKE that shows different ways of emulating the look and feel of standard buttons inside Google Sheets.

More specifically, this function _slightly_ improves upon Kanshi's pattern 1, where alternate drawings are used as a single button, that nevertheless requires changing focus from the current sheet to a temporary one and back again for changes to visually take effect.

This alternate approach moves buttons beyond the boundaries of the current sheet applying negative offsets using method [setPosition](https://developers.google.com/apps-script/reference/spreadsheet/drawing#setPosition(Integer,Integer,Integer,Integer)) of class `Drawing`.

```javascript
 // Toggle button state by moving appropiate drawing beyond sheet bounds
  drawings.forEach(d => {
    if (d.getOnAction() == name) {
      d.setPosition(1, 1, -1000, -1000); // << Moving out of sight does not require changing focus to / from another sheet to refresh!
    }
    else {
      d.setPosition(buttonRowCol.row, buttonRowCol.col, 0, 0);
    }
  });
```
