# Toggle drawings used as buttons in Google Sheets

Sample code that shows how to use Google Sheets drawings as conventional UI buttons to invoke Apps Script functions. Code is based on this post ([Switching Buttons for Google Spreadsheet using Google Apps Script](https://tanaikech.github.io/2020/07/27/switching-buttons-for-google-spreadsheet-using-google-apps-script/)) by **Kanshi TANAIKE**, that demonstrates different ways of emulating the look and feel of standard buttons inside Google Sheets.

More specifically, this function _very slightly_ improves upon Kanshi's _pattern 1_, where alternate drawings are used as a single button, that nevertheless r_equires changing focus from the current sheet to a temporary one and back again for changes to visually take effect_.

![](https://user-images.githubusercontent.com/12829262/101808688-ef987f00-3b16-11eb-9db1-f33ad986a241.gif)

This alternate approach hides drawings (buttons) accordingly by moving them beyond the boundaries of the current sheet. To accomplish that, **negative offsets** are applied to them using method [setPosition()](https://developers.google.com/apps-script/reference/spreadsheet/drawing#setPosition(Integer,Integer,Integer,Integer)) of class `Drawing`. **This does not require any kind of trick to update the presentation**, apparently not even the use of `SpreadsheetApp.flush()`.

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

This function supports several buttons in the same sheet, adjusting their rows and columns as expected.
