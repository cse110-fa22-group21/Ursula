# Meeting 11/05/2022

## Meeting Time & Location

6pm CSE Basement

## Minutes

6pm - 8pm

## Attendance List

-   [ ] Ji Hoon Kim
-   [ ] Michael Ruddy
-   [x] Linh Nguyen
-   [x] Joyce Weng
-   [x] Moritz Wagner
-   [x] Nikki Rejai
-   [ ] Tianya Zhan
-   [x] Vicky Chou
-   [x] Ziting Xiong
-   [x] Melvyn Tan

## Team Number

Team 21

## Unresolved Business From Past CSS Team

-   Fix the margin of footer
-   Fix the inconsistency in font size and alignment in the navigation section

## Goals For Today

-   [x] Continue CSS development from the past team
-   [x] Fix margin of footer
-   [x] Fix structure and organize files
-   [x] Breakdown our tasks

## Bugs From Last Time

We fixed the issue of the margin of the footer by removing the padding of the body tag. This was causing unnecessary padding for the footer that made it look unusual. We created a file structure for the files. Images folder for images, scripts for JavaScript files, styles for CSS files. The html pages will be left in the root folder for now. We created extra CSS files that were used specifically for styling of the header and footer, linked the file to each HTML page so that each CSS file specific to the page only contained styling for that page. This is still a work in progress.

## Breaking Down Tasks

1. Task list header

-   Add button icon beside task list header to create new tasks
-   Pop-up on-click with a form for each input

2. Task name (text input)
3. Estimated time (text inputs, accept numbers only)

-   Hours
-   Minutes

4. Status options

-   Planned
-   In Progress

6. Task Type (text input)

-   Optional: Have existing task types as drop down options

7. Task table

-   Display column names
    1. Task name
    2. Estimated time
    3. Status
    4. Action column for editing but this word is unnecessary
-   Each row:
    1. Drop down icon to the right of the task name (arrow)
    -   On-click displays associated notes below task
    2. Estimated time in words (string)
    -   E.g. 2 hr 30 min
    3. Edit icon on right most column to show a drop down of:
    -   Notes on the left
    -   Function handling on-click action when user clicks on edit icon will display notes in html
    -   Remaining task fields on the right that can be edited

6. Complete task button

-   Once clicked, status will change to ‘completed’
-   Remove task button
-   Close (X) button closes/hides the drop down

## TODO

-   Make css file to store style for all pages
-   Add image to edit icon
-   Schedule a meeting time to distribute work regarding JavaScript files

## What we learned:

-   Live share works if we split up tasks, and are not all editing the same thing without other people knowing
-   Instead we can either screen share and make suggestions, while working virtually
-   Or work in person while splitting tasks clearly
