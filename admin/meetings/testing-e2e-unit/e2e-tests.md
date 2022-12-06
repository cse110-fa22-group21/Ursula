# E2E Tests to Do by Melvyn
Add
1. Click add button, fill information on form then click submit. Check if the correct data is in the table. Also check local storage.
2. Click add button, fill information on form then click cancel. Check that the data in the table did not change. Also check local storage.
3. Click add button, fill information on form but set data of minutes and hours to be negative values. Click submit and check local storage.

Edit
1. Once 1 item is in the table, click edit then check that populated data in form is correct
1.1 Re-edit the data in the form and click submit. Check that the data in the table is correct. Also check local storage.
2. Once 1 item is in the table, click edit then re-edit data in the form and click cancel. Check that the data in the table is correct. Also check local storage.
3. Once 1 item is in the table, click edit but set data in the form data to be - minutes and - hours. Click submit and check local storage to see if it changed.

Delete
1. Once 1 item is in the table, click the edit button then click delete button and check to see if data in the table is deleted. Also check local storage.

Team 1 - Main Page
1. Reset button - In a task, when the start button has not clicked yet. Click the reset button and check to see if the task status is set to “Planned”.
2. Reset button - In a task, when the start button has been clicked. Click the reset button and check to see if the task status is set to “Planned”.
3. Start Button - Check to see if started is false, start is undefined, status is planned. Click start, check to see if started is true, start is not undefined, status is in-progress.
4. End Button - Check to see if started is true, start is not undefined, status is In-Progress, finished is false. Click finished, check to see if finished is true, end is not undefined, status is Completed.
5. Add 100 tasks to the table via the form. Add another task and then check that the number of tasks in local storage is still 100.

Team 2 - Log Page
1. Add a task, click start and finish. Check that the data is correctly placed in the table in the log page.
2. Add 100 tasks to the table via the form, click start and then click finish for all of them. Add a new task to the form then click start and finish, note down in the log page if the table removed the oldest one.

Team 3 - Analytics Page
1. Add a task, click start and finish. Check that the data is correctly placed in the table in the analytics page. This can be followed directly from Team 2 - Log Page 1.
2. Add 100 tasks to the table via the form, click start and then click finish for all of them, note down in the analytic page removed 

E2E Testing Process
1. Add 1
2. Add 2
3. Add 3 
4. Edit 1
5. Edit 1.1
6. Edit 2
7. Edit 3
8. Team 1 - Main Page 1
9. Team 1 - Main Page 2
10. Team 1 - Main Page 3
11. Team 1 - Main Page 4
12. Team 2 - Log Page 1
13. Team 3 - Analytic Page 1
14. Delete 1
15. Team 1 - Main Page 5
16. Team 2 - Log Page 2
17. Team 3 - Analytics Page 2
