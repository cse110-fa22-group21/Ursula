# Team 21 Meeting Time Stamp Refactoring and Debugging 11/27/2022

## Meeting Time & Location
3pm Zoom

## Minutes
3pm - 4:10pm

## Attendance List
- [ ] Ji Hoon Kim
- [ ] Michael Ruddy
- [ ] Linh Nguyen
- [ ] Joyce Weng
- [ ] Moritz Wagner
- [ ] Nikki Rejai
- [ ] Tianya Zhan
- [x] Vicky Chou
- [ ] Ziting Xiong  
- [x] Melvyn Tan

## Agenda
- [x] Bug regarding extracting data correctly in the right form using Date().
- [x] Refactor the code for startSwitch and endSwitch.

## Extracting Time
Since Date objects are stringified into JSON differently, we need to use the Date.parse method in order to get the Date object back into the correct form from the local storage.

## Refactoring Code for startSwitch and endSwitch
There was duplicate code when correctly switching the button to start and finish. We created 2 functions called startSwitch and closeSwitch that set the data values to be correct according to the condition in which the button was pressed, which depends upon the `started` boolean value.

## TODO
1. Unit testing for the date.
