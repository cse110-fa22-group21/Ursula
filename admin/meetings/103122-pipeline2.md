# Pipeline Meeting 10/31/2022

## Meeting Time & Location

7pm Google meet

## Minutes

7pm - 8:20pm

## Attendance List

-   Joyce
-   Melvyn
-   Moritz
-   Tianya
-   Vicky

## Team Number

Team 21

## Goals For Today

-   [x] Decide on branch protection rules
-   [x] Decide on programming protocols - variable naming, comments, syntax
-   [ ] Find suitable Github workflows
-   [ ] Decide on storing user data

## Branch Protection

1. Merge into main

-   At least 2 pull request reviewers

2. Merge into feature branches

-   1 pull request reviewer <br>
    Helpful [link](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions) on how to set each branch for a specific branch protection.

## Hosting

Github Pages

## Github Workflow

Need to find github actions for running automated checks syntax <br>
[HTML5 Validator](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

## Storing User Data

Store user inputs into a JSON file

## Programming Protocols

### Variable and Function Naming Conventions

1. camelCase
2. Constants in UPPERCASE
3. Put spaces around operators ( = + - \* / ), and after commas E.g. `let x = 1 + 2;`

### Frequency of Comments & Documentation

[Helpful link](http://ieng6.ucsd.edu/~cs12x/style.html)

1. Functions
   `/\*\*

-   Adds two numbers.
-   @param {number} num1 The first number to add.
-   @param {number} num2 The second number to add.
-   @return {number} The result of adding num1 and num2.
    \*/
    function bigThing() {
    // ...
    }`

2. HTML <br>
   Comments for each new section at the start.

3. CSS <br>
   Comments for each section.

4. JavaScript <br>
   One line of comment whenever necessary, for example after every 5 lines or when there is an important piece of code.

### Auto Indent

Tab inside functions or use VS Code shortcut

### Curly Brackets

Curly brackets should be on the same line as the function declaration
function myFunction() {

### Syntax Statements

End with a semicolon, including objects
