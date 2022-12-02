# Add and Edit E2E 11/30/2022

## Meeting Time & Location
8pm CSE basement & Zoom

## Minutes
8pm - 10pm

## Attendance List
- [ ] Ji Hoon Kim
- [ ] Michael Ruddy
- [ ] Linh Nguyen
- [x] Joyce Weng
- [x] Moritz Wagner
- [ ] Nikki Rejai
- [ ] Tianya Zhan
- [x] Vicky Chou
- [ ] Ziting Xiong 
- [x] Melvyn Tan

## Team Number
Team 21

## Goals For Today
- [x] Implement e2e tests for add functionality together

## Implementation
We began trying to implement e2e tests for the add button. We managed to get a hold of the button and then clicked it. Upon clicking, we manage to use eval to get a hold of the input form and then populate it with data. We then clicked the save button and were stuck on a navigation error for some time. After some time, we realised that we must use a page.waitForNavigation() as clicking submit button will reload the page and hence the localstorage could not be accessed.

## TODO
1. Continue implementing e2e tests.
2. We can split into our groups to continue as we have added a task to the page.