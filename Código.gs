/**
 * Toggle drawings in a Google Sheet (used as buttons) without changing / refreshing active sheet
 * Based on https://tanaikech.github.io/2020/07/27/switching-buttons-for-google-spreadsheet-using-google-apps-script/
 */

// Button A
const buttonA1 = () => switching('buttonA1');
const buttonA2 = () => switching('buttonA2');

// Button B
const buttonB1 = () => switching('buttonB1');
const buttonB2 = () => switching('buttonB2');

// Button coordinates inside sheet
const buttonsRowCol = [
  {name: 'buttonA', row: 3, col: 3},
  {name: 'buttonB', row: 6, col: 3},
];

/**
 * Toggles buttons
 */
function switching(name) {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();

  // Get drawing (button) that has been clicked and its twin (button[1 | 2])
  const drawings = sheet.getDrawings().filter(d => d.getOnAction().slice(0, -1) == name.slice(0, -1));

  // Get row and col for current drawing (button)
  const currentDrawingName = drawings[0].getOnAction() == name ? name : drawings[1].getOnAction();
  const buttonRowCol = buttonsRowCol.find(b => b.name == currentDrawingName.slice(0, -1));
  
  // Toggle button state by moving appropiate drawing beyond sheet bounds
  drawings.forEach(d => {
    if (d.getOnAction() == name) {
      d.setPosition(1, 1, -1000, -1000); // << Moving out of sight does not require changing focus to / from another sheet to refresh!
    }
    else {
      d.setPosition(buttonRowCol.row, buttonRowCol.col, 0, 0);
    }
  });
}

/**
 * Bring all buttons back!
 */
function resetDrawings() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  sheet.getDrawings().forEach((d, i) => {
    d.setPosition(1+3*i, 1, 0, 0);
  });
}
