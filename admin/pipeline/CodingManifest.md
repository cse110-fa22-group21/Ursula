# Coding Manifest for Team 21 - Ursula
## Contents
1. Github
    1. Issues
    2. Branches
    3. Pull requests and merging
    4. Project board
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
* Bugs: `bugs-<name>`
* Features: `feature-<name>`
* Issues: `WIP-<name>`
