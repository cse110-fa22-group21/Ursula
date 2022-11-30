# E2E Testing and Unit Testing Automation 11/29/2022

## Meeting Time & Location
6:30pm Zoom

## Minutes
6:30pm - 11pm

## Attendance List
- [ ] Ji Hoon Kim
- [ ] Michael Ruddy
​​- [ ] Linh Nguyen
- [x] Joyce Weng
- [x] Moritz Wagner
- [ ] Nikki Rejai
- [x] Tianya Zhan
- [x] Vicky Chou
- [ ] Ziting Xiong 
- [x] Melvyn Tan

## Agenda
- [x] Implement unit test automation using Jest
- [x] Implement E2E automation using Puppeteer
- [x] Fully automated github pages with docs integration
- [x] Implement Codacy for the Repo and add the grade to the Readme
- [x] Implemented Prettier for enforcing code style
- [x] Complete CI/CD Phase 1 Assignments

## Automation Unit Testing Using Jest
We have implemented the automated unit testing using jest. For now, we have used a sample test function called sum.js and placed it in the scripts folder with the other js files. We wrote a sample unit test in __tests__ that tests the sum.js file. The script for the workflow is in the workflows folder and is called test.yml. Upon every push, the unit test will be run.

Jest has the ability to mock local storage, this may be used in the future.
https://robertmarshall.dev/blog/how-to-mock-local-storage-in-jest-tests/

## Automation E2E Testing Using Jest and Puppeteer
We have implemented the automated end-to-end testing using puppeteer and jest. For now, we have a sample test file called endtoend.test.js. E2E tests will be written here.

## Implement Prettier
Moritz has successfully implemented Prettier that enforces our programming controls for example using tabs instead of spaces. Prettier is called on every pull request.

## Implement Codacy
We have created accounts on Codacy and linked our repository to it. We selected some coding styles to follow and based on this, Codacy will evaluate our repository to it. We have included the grade we received onto the README.

## CI/CD Phase 1 Assignments
Created phase2.md, phase2.drawio.png, phase2.mp4 along with the new pipeline content that we have added.
