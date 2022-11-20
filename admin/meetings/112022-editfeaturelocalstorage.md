# Meeting 11/20/2022

## Meeting Time & Location
11am Zoom

## Minutes
11am - 12pm <br>
12:45pm - 1:30pm

## Attendance List
- [ ] Ji Hoon Kim
- [ ] Michael Ruddy
​​- [ ] Linh Nguyen
- [ ] Joyce Weng
- [ ] Moritz Wagner
- [x] Nikki Rejai
- [ ] Tianya Zhan
- [ ] Vicky Chou
- [ ]  Ziting Xiong 
- [x] Melvyn Tan

## Team Number
Team 21

## Goals For Today
- [x] Create branch for edit local storage.
- [x] Populate the data into the edit form.
- [x] Save the new data into local storage.
- [x] Add the functionality to the buttons to get data and save data.
- [x] Write necessary comments and documentation.
- [x] Perform a pull request and wait for reviewers feedback.

## Branch Name
Branch name is called feature-editstorage.

## Issue Number
Number 44

## Implementation of Edit
1. Write function call getData that finds the data given the ID and populates the data into the edit form.
2. Added event listener to the edit button to call getData when clicked.
3. Data now populates into the edit form, we will now write the saveData function that when the saved button is clicked, will save the new data into the local storage and display the new data.
4. Added event listener to submit edit button to call saveData when clicked.
5. Added comments and styling for JSDocs.
6. Important note, the id of each task name can be acquired easily by getting the class name of the editButton and calling [0].id on it to get the unique ID for each task row.

## TODO
1. Wait for reviewers to provide feedback and then make changes accordingly.
