# Team 21 Meeting 11/27/2022

## Meeting Time & Location
12pm zoom

## Minutes
12pm - 2:30pm

## Attendance List
- [ ] Ji Hoon Kim
- [x] Michael Ruddy
- [ ] Linh Nguyen
- [ ] Joyce Weng
- [ ] Moritz Wagner
- [ ] Nikki Rejai
- [ ] Tianya Zhan
- [x] Vicky Chou
- [ ] Ziting Xiong  
- [x] Melvyn Tan

## Agenda
- [x] Implement start/finish button - issues with CSS
- [x] Implement status toggle in edit menu
- [x] Implement pop up when we reach max # of tasks


## Change of Decisions
- No longer displaying status input when adding task
- Start button changes task status from “planned” to “in-progress”
- Added reset button to reset start time of task on edit form
- Unlimited # of tasks


Team 1: Finishing To Do Page - Melvyn, Michael, Vicky
- [x] Save start time (in json) - stored in data.start
- [x] Save end time (in json) - stored in data.end
- [x] Save difference (in json) - stored in data.difference
- [x] Implement start/finish button - issues with CSS
- [x] Implemented reset button in edit menu
- [x] Make task disappear when complete

## Notes for Team 2
- Go to TODO comment at line 145 in add.js, this is where you need to handle moving the task to the log before it is deleted on line 146.  You need to make a copy and add it to the log table :)
