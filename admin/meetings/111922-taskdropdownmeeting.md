# On Task Click, Open Task Notes 11/19/2022

## Meeting Time & Location

12:15pm Zoom

## Minutes

12:15pm - 2:20pm

## Attendance List

-   [ ] Ji Hoon Kim
-   [x] Michael Ruddy
-   [ ] Linh Nguyen
-   [ ] Joyce Weng
-   [x] Moritz Wagner
-   [ ] Nikki Rejai
-   [ ] Tianya Zhan
-   [x] Vicky Chou
-   [ ] Ziting Xiong
-   [x] Melvyn Tan

## Agenda

-   [x] Implement drop down menu for task notes
-   [x] Choose colors for drop down menu

## Task name on click will open task notes

We are considering 2 options

1. Dropdown when the task name is clicked but implementation wise is quite difficult. This was what we originally planned to do.
2. The notes will popup on the screen like how add or edit form does. This is the easiest and simplest way to do but is limited by the number of notes that can be shown on screen. Only 1 note for each task can be shown.

## Final Decision

We have decided to do option 1 with the on click on a task table row that will show the notes. When creating a new table row for an added task, we will add an additional notes table row with the colspan of 4 to take up the entire row that shows the notes of the task name. Then the user can show/hide the notes by clicking the row.

## Implementation/Colors

We chose a color similar to our ursula purple to serve as a hover/note color. The dropdown row with the notes has this background color and the row in the table you are currently hovering over has this color. The user can show/hide the notes at will and they are aware the rows are clickable. We implemented this by inserting code which attaches an extra notes row to each task row and an event listener from clicking the row.

## How the click is obvious

We changed the cursor to be a pointer when it hovers over the task row. We also added a hover color to each task name to allow for indication that it can be clicked.

## TODO

1. Delete team will need to delete the notes for each task as well.
