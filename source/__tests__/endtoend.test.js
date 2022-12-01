// const { it } = require("node:test");

// const puppeteer = require('puppeteer');

// TESTING DELETE LATER
function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

describe('Basic user flow for Website', () => {
    // First, the website
    beforeAll(async () => {
      // const browser = await puppeteer.launch();
      await page.goto('https://cse110-fa22-group21.github.io/cse110-fa22-group21/');
    });
  
    // Check to see that there are 0 tasks
    it('Initial Home Page - Check for 0 task names', async () => {
      console.log("In the home page now");
      const storage = await page.evaluate(() => {
        return window.localStorage.getItem('tasks')
      });
      expected = null;
      expect(storage).toBe(expected);
    });

    // Add Team Testing
    it('Add Team - Testing add Button', async () => {



      // Grab the addButton
      let addButton = await page.$('#addButton');
      // Click the addButton
      await addButton.click();

      // Populate the data in the input fields
      // TaskName Field
      // Set sample task
      // const testTask = {
      //   "name": "Task 1",
      //   "hour": 10,
      //   "min": 50,
      //   "type": "CSE 110",
      //   "note": "My name is kaiserschmarren"
      // }
      // console.log(testTask);
      // console.log(testTask.name);
      // console.log(typeof testTask.name);
      const taskName = await page.$('#taskNameField');
      await page.evaluate((taskName) => { taskName.setAttribute('value', 'Task 1'); }, taskName);
      let myAnswer = await taskName.getProperty('value');
      let parsed = await myAnswer.jsonValue();
      console.log(parsed);

      // Hour Field
      const hour = await page.$('#hourField');
      await page.evaluate(hour => { hour.setAttribute('value', '2'); }, hour);

      // Minute Field
      const min = await page.$('#minField');
      await page.evaluate(min => { min.setAttribute('value', '50'); }, min);

      // Type of Task Field
      const typeTask = await page.$('#typeTaskField');
      await page.evaluate(typeTask => { typeTask.setAttribute('value', 'CSE 110'); }, typeTask);

      // Text Area Field
      const textArea = await page.$('#noteField');
      await page.evaluate(textArea => { textArea.innerText = 'My name is kaiserschmarren'; }, textArea);

      // Get The Save Button
      let submitButton = await page.$('#subButton');

      // Click the Save Button
      await submitButton.click();
      
      // IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS, 
      await page.waitForNavigation();
      
      // Get the Item from local Storage
      const localStorage = await page.evaluate(() => localStorage.getItem('tasks'));
      
      // Check if localStorage length is 1
      var arrayFromStorage = await JSON.parse(localStorage);
      var arrayLength = await arrayFromStorage.length;
      expect(arrayLength).toBe(1);

    });
    
    // Edit Team Testing 
    it('Edit Team - Testing add Button', async () => {
      let myStorage = await page.evaluate(() => {
        return localStorage.getItem('tasks');
      });
      console.log(myStorage);
    });
  });