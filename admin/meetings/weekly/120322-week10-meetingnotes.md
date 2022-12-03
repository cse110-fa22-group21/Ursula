Team 21 Meeting 12/02/2022

## Meeting Time & Location
3pm Zoom & cse basement

## Minutes
3:03pm - 4:48pm

## Attendance List
- [x] Ji Hoon Kim
- [x] Michael Ruddy
​​- [x] Linh Nguyen
- [x] Joyce Weng
- [x] Moritz Wagner
- [x] Nikki Rejai
- [x] Tianya Zhan
- [x] Vicky Chou
- [x] Ziting Xiong 
- [x] Melvyn Tan

## Unresolved Business
1. Automation of E2E and Unit testing for pipeline
2. E2E Testing Teams for those who are unassigned
3. Deadline for E2E and Unit testing

## Goals For Today
- [x] E2E Testing Update
- [x] Setting up automation of e2e and unit on main
- [x] Decide what we should e2e test
- [x] Figure out what unit tests are

## Interview Time
- Waiting on response from TA
- Interview on Monday

## Automation of E2E and Unit Testing
We need to figure out how to automate e2e. Vicky and Moritz will work on this. Vicky, Moritz and Joyce figured out how to automate the e2e and unit testing. There was a pull request and it has been merged into main.

## E2E Updates
1. Add team - Vicky and Tianya have completed the E2E tests for adding feature. Joyce also helped in this.
2. Edit team - Melvyn and Nikki have completed the E2E tests for edit feature.

## E2E Testing
Everything should be done by Tuesday Night
1. Test main page - add & edit tasks, check 100 cap of tasks, resetting tasks, & finish tasks
    - Michael, Melvyn, Vicky, Tianya 
2. Test log page - test that when finish clicked data goes to log table & is correct
    - Ji, Ziting, Linh
3. Analytics page - test that when finish clicked data goes to log table & data & emoji are correct
    - Nikki, Moritz, Tianya
4. Delete team - test that data is deleted
    - Moritz

### Add
1. Click add button, fill information on form then click submit. Check if the correct data is in the table. Also check local storage.
2. Click add button, fill information on form then click cancel. Check that the data in the table did not change. Also check local storage.
3. Click add button, fill information on form but set data of minutes and hours to be negative values. Click submit and check local storage.

### Edit
1. Once 1 item is in the table, click edit then re-edit the data in the form and click submit. Check that the data in the table is correct. Also check local storage.
2. Once 1 item is in the table, click edit then re-edit data in the form and click cancel. Check that the data in the table is correct. Also check local storage.
3. Once 1 item is in the table, click edit but set data in the form data to be - minutes and - hours. Click submit and check local storage to see if it changed.

### Delete
1. Once 1 item is in the table, click the edit button then click delete button and check to see if data in the table is deleted. Also check local storage.

### Team 1 - Main Page
1. Reset button - In a task, when the start button has not clicked yet. Click the reset button and check to see if the task status is set to “Planned”.
2. Reset button - In a task, when the start button has been clicked. Click the reset button and check to see if the task status is set to “Planned”.
3. Add 100 tasks to the table via the form. Add another task and then check that the number of tasks in local storage is still 100.

### Team 2 - Log Page
1. Add a task, click start and finish. Check that the data is correctly placed in the table in the log page.
2. Add 100 tasks to the table via the form, click start and then click finish for all of them. Add a new task to the form then click start and finish, note down in the log page if the table removed the oldest one.

### Team 3 - Analytics Page
1. Add a task, click start and finish. Check that the data is correctly placed in the table in the analytics page. This can be followed directly from Team 2 - Log Page 1.
2. Add 100 tasks to the table via the form, click start and then click finish for all of them, note down in the analytic page removed 

### E2E Testing Process
1. Add 1
2. Add 2
3. Add 3
4. Edit 1
5. Edit 2
6. Edit 3
7. Team 1 - Main Page 1
8. Team 1 - Main Page 2
9. Team 2 - Log Page 1
10. Team 3 - Analytic Page 1 - We have 1 task at this point
11. Delete 1 - We have 0 task at this point
12. Team 1 - Main Page 3 - We have 100 tasks at this point
13. Team 2 - Log Page 2
14. Team 3 - Analytics Page 2

## TODO
1. Wait for feedback from Navya regarding what to unit test
2. Continue creating e2e tests based on what team you are assigned to
3. Meet on Monday night for team interview
4. Look on GitHub Issues and solve some issues
5. Create video for final assignment
