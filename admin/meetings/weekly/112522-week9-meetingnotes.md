# Team 21 Meeting 11/25/2022

## Meeting Time & Location
3pm zoom

## Minutes
3:02pm - 3:57pm
## Attendance List
- [x] Ji Hoon Kim
- [x] Michael Ruddy
- [x] Linh Nguyen
- [x] Joyce Weng
- [ ] Moritz Wagner
- [x] Nikki Rejai
- [ ] Tianya Zhan
- [x] Vicky Chou
- [ ] Ziting Xiong  
- [x] Melvyn Tan

## Agenda
- [x] Definition of Done
- [x] Distribute teams

## To-do
1. JSDocs on GitHub Actions
2. How to put unit testing & E2E on GitHub Actions or Do we do manually? https://github.com/marketplace/actions/run-jest
3. Unit Test, JSDocs for CRUD features
4. Think of bugs and edge cases regarding the timestamps for Team 1. For example, 

## Definition of Done
1. Unit testing completed
2. End to End testing (E2E) completed
3. JSDocs generated

## ADR Ideas
1. Moving JSDOCS to pipeline instead of manually

Team 1: Finishing To Do Page - Melvyn, Michael, Vicky
- [x] Save start time (in json) - stored in data.start
- [x] Save end time (in json) - stored in data.end
- [x] Save difference (in json) - stored in data.difference
- [ ] Implement start/finish button - issues with CSS
- [ ] Implement pop up when we reach max # of tasks
- [ ] Implement status toggle in edit menu
- [ ] Make task disappear and go to log when complete

Team 2: Log page - Linh, Ji, Ziting 
- Display start and end timestamps, time taken
- Make sure that if local storage data is full(100 tasks) we delete oldest task from log (make sure to debug heavily)

Team 3: Analytics - Nikki, Moritz, Tianya
- Display Expected time
- Display Expected - actual
- Use a happy/sad face with varied color based on residual (or other idea to graphically represent the info)

Team 4: Joyces JSJest Team - Joyce, Vicky, Melvyn
- Adding JSDOCS to github actions
- Implementing jest to pipeline
- End to End Test 

Retro/Progress Meeting Monday at 6:15 on zoom
