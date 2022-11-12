# Meeting 11/09/2022

## Meeting Time & Location
3pm CSE basement

## Minutes
3pm - 5pm

## Attendance List
- [x] Ji Hoon Kim
- [ ] Michael Ruddy
- [x] Linh Nguyen
- [ ] Joyce Weng
- [x] Moritz Wagner
- [ ] Nikki Rejai
- [x] Tianya Zhan
- [x] Vicky Chou
- [x]  Ziting Xiong 
- [x]  Melvyn Tan

## Team Number
Team 21

## Goals For Today
- [x] Breaking tasks to small groups

## Breaking teams
- C - after clicking add button and the submit button, the data will be displayed on the page, after that, the info will go to the local storage. Make data structure format ( json file in the storage (Json parse function)) - 6 people
- R - Read the data from the local storage, bring the data to the screen display on the load page, and make some algorithms for the analysis page. Both pages have the same display - 4 people
- U -  edit 
- D - delete
## Input data types
- Identify number 
- to calculate each task time, it requires distinguishing each task from back log, we just pick logs with the same id# and then use them.
- Task name (input string)
- Estimated time (hour) - integer/string
- Estimated time (minute) - integer/string
- Type of task (input ) - string
- Restart time - timestamp 
- Note (input)
- Json file example:
`
[
{
	“idNum” : “0”,
”taskName” : ”task1”,
”estimatedHour” : ”5”,
”estimatedMin” : ”30”,
”typeOfTask” : ”Back-end”,
“notes” : “do the jobs”
},
{
“idNum” : “1”,
”taskName” : ”task2”,
”estimatedHour” : ”3”,
”estimatedMin” : ”20”,
”typeOfTask” : ”Front-end”,
“notes” : “do the jobs”
},
{
“idNum” : “2”,
”taskName” : ”task3”,
”estimatedHour” : ”2”,
”estimatedMin” : ”30”,
”typeOfTask” : ”Front-end”,
“notes” : “do the jobs”
},
…
]
`


## Things left to do
- CREATE AND READ HAVE TO BE FINISHED BY THE END OF THIS WEEK
- Joyce helps with the mermaid tail
- Divide five teams (create team should start before the read team)
- Responsive app	: Ziting,
- Create team	: Moritz,
- Read team	: Linh, Tianya
- Update/Delete	: Vicky, Melvyn
- Test case		:

## to-do
1. Responsive app	: response by display size (phone/tab/pc)
2. Create team	: make a pop-up window for add, save the info into local storage 
3. Read team	: bring data from local storage, display at log/analysis page
4. Update/Delete	: change/delete data at local storage
5. Test case		: test 1-4

