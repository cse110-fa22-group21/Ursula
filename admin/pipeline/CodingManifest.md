# Coding Manifest for Team 21 - Ursula
## Contents
1. Github
    1. Issues
    2. Branches
    3. Pull Requests & Branch Protection
    4. Project Board
2. Programming Protocols
   1. Naming Conventions
   2. Indentation and Curly Brackets
   3. HTML
   4. CSS
   5. Javascript

## GitHub
### Issues
The organization of our project will be heavily based open GitHub Issues. Every modification to our repository should be based on an open Issue. \
Issues should always contain at least two labels, specifing a *where* and a *what*, but an Issue can of course be related to more labes than just these two.

*Where* specifies the part of the repository the issue relates to:
- html
- css
- js
- management

*What* specifies the type of issue:
- **bug**: Something isn't working
- **documentation**: Add or modify documentation for the codebase or procedures
- **feature**: Addition of a new feature
- **graphics**: Add or modfiy Graphical elements (such as icons, images, etc.)
- **pipeline**: Changes to the procedures of the development process 

If something doesn't fit this pattern, it can just be added without a repective label.\
Please use these labels when requesting or reporting changes to the codebase. You should also mark as precise as you can which part of the Site a Issue belongs to, for example
> (html)(feature) To-Do List, Header - Add button to create new tasks \
> (js)(feature) Analytics - Implement sorting of tasks

### Branches
Every major part of the website gets its own branch, for example the Header or the table in the To-Do-List. Then, a branch can be created for each feature (name starts with `feature-` as shown below) where individual features can be developed. Once the feature is complete, create a pull request for the branch and merge. \
Don't delete the branch, as it might be needed for bugfixes down the line. 

Name the branches according to the following types:
* Bugs: `bug-<name>`
* Features: `feature-<name>`
* Issues: `WIP-<name>`

### Pull Requests & Branch Protection
Each pull request will be reviewed and approved by 2 other reviewers. 

### Project Board
Use the To Do List board on Github Projects tab to update status of issues. Add issues to each stage in the project board in order of priority. 

## Programming Protocols

### Naming Conventions
1. Variable Naming <br>
We will be using the **camelCase** naming convention. <br>
First words will be lowercase but the first character of every word after will be upper case. <br>
`numTasks`, `numLogs`, `taskName`

2. Function Naming <br>
We will be using the **camelCase** naming convention. <br>
`createTasks()`, `editTasks()`, `deleteTasks()`

3. Constants <br>
Constants will be in **UPPERCASE**. <br>
`ELEMENTS = 100`, `TASKS = 50`, `PI = 3.41...`

4. Syntax Statements  <br>
Every line of code should end with a semi-colon, including objects when necessary. <br>
`CONST NEWOBJECT = object;`, `let numTasks = 10;`, `var updated = true;` 

5. Spacing Around Operations <br>
There should be spaces between the operators `= + - * /` <br>
`let x = 1 + 2;`, `let y = 'my' + 'string';`, `let z = true;`

## Indentation and Curly Brackets

1. Auto Indentation <br>
1 Tab inside functons or use VS Code Shortcut <br>

2. Curly Braces { } <br>
Curly Braces will be on the same line of every piece of code that is required to use `{` <br>
`if {`, `function myFunction() {`, `else {`

## HTML
Write comments when necessary especially when creating `<section> <div>`. <br>
`<!-- This section will contain the main table of the page -->` <br>
 `<section>` <br>
    `<p> Testing </p>` <br>
 `</section>` <br>
 
 ## CSS
 Write comments for each section <br>
 
 ## JavaScript
 Write comments whenever necessary, for example comment complicated looking code.
