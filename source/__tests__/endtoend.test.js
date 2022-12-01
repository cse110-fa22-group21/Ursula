// const puppeteer = require('puppeteer');

describe('Basic user flow for Website', () => {
    // First, the website
    beforeAll(async () => {
      // const browser = await puppeteer.launch();
      await page.goto('https://cse110-fa22-group21.github.io/cse110-fa22-group21/');
    });
  
    // Check to see that there are 0 tasks
    it('Initial Home Page - Check for 0 task names', async () => {
      const storage = await page.evaluate(() => {
        return window.localStorage.getItem('tasks')
      });
      expected = null;
      expect(storage).toBe(expected);
    });

    // Add Team Testing
    it('Add Team - Testing add Button', async () => {
      // Grab the add button to click
      const addButton = await page.$('#addButton');
      await addButton.click();

      // Create a task to test against localStorage data
      let tasks = [{
        "name": "Task 1",
        "hours": "10",
        "minutes": "50",
        "type": "CSE 110",
        "notes": "My name is kaiserschmarren"
      }]
      const task = tasks[0];

      // create JSHandle for task variable to be passed into pageFunction in evaluate()
      // returns value wrapped as in-page object
      const testTask = await page.evaluateHandle((task) => task, task); 

      // Populate task data in input fields, starting w/ TaskName field
      const taskName = await page.$('#taskNameField');
      await page.evaluate((taskName, testTask) => { 
        taskName.setAttribute('value', testTask.name); 
      }, taskName, testTask);

      // Hour Field
      const hour = await page.$('#hourField');
      await page.evaluate((hour, task) => { hour.setAttribute('value', task.hours); }, hour, testTask);

      // Minute Field
      const min = await page.$('#minField');
      await page.evaluate((min, task) => { min.setAttribute('value', task.minutes); }, min, testTask);

      // Type of Task Field
      const typeTask = await page.$('#typeTaskField');
      await page.evaluate((typeTask, task) => { typeTask.setAttribute('value', task.type); }, typeTask, testTask);

      // Note Field
      const textArea = await page.$('#noteField');
      await page.evaluate((textArea, task) => { textArea.innerText = task.notes; }, textArea, testTask);

      // Get the submit button and save task entry
      let submitButton = await page.$('#subButton');
      await submitButton.click();
      
      // IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS, 
      await page.waitForNavigation();
      
      // Get the Item from local Storage
      const localStorage = await page.evaluate(() => localStorage.getItem('tasks'));
      const storageData = JSON.parse(localStorage);

      // Check if localStorage only has one task added
      var arrayFromStorage = await storageData;
      var arrayLength = await arrayFromStorage.length;
      expect(arrayLength).toBe(1);

      // Check if task inputs are stored correctly
      // Essentially only checks the first entry in the json
      for (let index in storageData) {
        let entry = storageData[index];
        Object.entries(task).forEach((pair) => {
          let key = pair[0];
          let value = pair[1];
          expect(entry[key]).toBe(value);
        })
      }
    });
    
    // Edit Team Testing 
    it('Edit Team - Testing add Button', async () => {
      let myStorage = await page.evaluate(() => {
        return localStorage.getItem('tasks');
      });
    });
  });