# Meeting 11/11/2022

## Meeting Time & Location

3:15pm Zoom

## Minutes

3:15pm - 6:30pm

## Attendance List

-   [ ] Ji Hoon Kim
-   [ ] Michael Ruddy
-   [x] Linh Nguyen
-   [x] Joyce Weng
-   [x] Moritz Wagner
-   [ ] Nikki Rejai
-   [ ] Tianya Zhan
-   [x] Vicky Chou
-   [ ] Ziting Xiong
-   [x] Melvyn Tan

## Team Number

Team 21

## Goals For Today

-   Create branch for add feature
-   Discuss how to implement the Create Button

## Unresolved Business

-   Approve merge request regarding CSS changes

## Merging CSS changes

Melvyn has approved the CSS changes and has been merged into the main repo. The team can now begin implementing the add feature.

## Branch Name

All implementations for the add feature will be on the “add-feature” branch name.

## Issue Number

This feature will be under issue number 24.

## New Files Added and Edited

1. add.js contains javascript for index.html
2. index.css made styling changes to the popup form
3. index.html added popupForm

## Implementation of Add

1. Add Button should have add event listener to “click”
2. Popup form

-   We will create a div element with a form attached, it will be initially set to display: none
-   The form will contain inputs and labels for the data we need
    -   Submit button to submit data
    -   Cancel button to hide the form and go back to the main page

3. JavaScript
    - openForm should set the display of the form to be block
    - closeForm should set the display of the form to be none
4. Form styling
    - The form should be in the center

## Initial Push

Pipeline flagged errors regarding the validation of HTML files. The changes have been made and it is awaiting approval to be pushed into the main repo.

## TODO

1. Peer review the code and approve or send back for feedback.
2. Inform team that Add button is working so that next features can be implemented.
