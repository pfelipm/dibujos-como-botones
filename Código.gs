/**
 * Toggle drawings in a Google Sheet (used as buttons) without changing / refreshing active sheet
 * Based on https://tanaikech.github.io/2020/07/27/switching-buttons-for-google-spreadsheet-using-google-apps-script/
 */

// Button A
const button1_On = () => switching('button1_On');
const button1_Of = () => switching('button1_Of');

// Button B
const button2_On = () => switching('button2_On');
const button2_Of = () => switching('button2_Of');

// Button coordinates inside sheet
const buttonsRowCol = [
  {name: 'button1', row: 3, col: 3, function: test1},
  {name: 'button2', row: 6, col: 3, function: test2}
];

/**
 * Toggle buttons
 */
function switching(name) {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();

  // Get drawing (button) that has been clicked and its twin button ([xxxx_On | xxxx_Off])
  const drawings = sheet.getDrawings().filter(d => d.getOnAction().slice(0, -3) == name.slice(0, -3));

  // Get row and col for current drawing (button)
  const currentDrawingName = drawings[0].getOnAction() == name ? name : drawings[1].getOnAction();
  const buttonRowCol = buttonsRowCol.find(b => b.name == currentDrawingName.slice(0, -3));
  
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
      // Log button status
      buttonStatus = d.getOnAction().slice(-3) == '_On' ? 'active' : 'inactive'; // If used after .setPosition in if branch above some flicker manifests! 🤔 

    }
  });
  
  // Invoke button's function
  buttonRowCol.function(buttonStatus);
}

/**
 * Function invoked by button test 1
 */
function test1(buttonStatus){
  SpreadsheetApp.getActiveSpreadsheet().toast(`Test1() has been called, button has ${buttonStatus} color.`);
}

/**
 * Function invoked by button test 2
 */
function test2(buttonStatus){
  SpreadsheetApp.getActiveSpreadsheet().toast(`Test2() has been called, button has ${buttonStatus} color.`);
}

/**
 * Aux: Bring all buttons back!
 */
function resetDrawings() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  sheet.getDrawings().forEach((d, i) => {
    d.setPosition(1+3*i, 1, 0, 0);
  });
}