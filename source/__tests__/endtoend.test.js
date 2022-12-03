
// const puppeteer = require('puppeteer');
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
      
      // IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
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
    // Test #1 Checking that edit form brings up correct data when edit button is clicked
    it('Edit Team - Click edit button then check if form is populated correctly', async () => {
      // Click on Edit Button of the newly added Task
      let editButton = await page.$('.editButton');
      await editButton.click();

      // Check to make sure fields are correct
      // Task Name Field
      const taskNameEdit = await page.$('#taskNameFieldEdit');
      let taskNameEditValue = await taskNameEdit.getProperty('value');
      let taskNameAnswer = await taskNameEditValue.jsonValue();
      expect(taskNameAnswer).toBe('Task 1');

      // Hour Field
      const hourEdit = await page.$('#hourFieldEdit');
      let hourEditValue = await hourEdit.getProperty('value');
      let hourEditAnswer = await hourEditValue.jsonValue();
      expect(hourEditAnswer).toBe('10');

      // Minute Field
      const minEdit = await page.$('#minFieldEdit');
      let minEditValue = await minEdit.getProperty('value');
      let minEditAnswer = await minEditValue.jsonValue();
      expect(minEditAnswer).toBe('50');

      // Type of Task Field
      const typeTaskEdit = await page.$('#typeTaskFieldEdit');
      let typeTaskEditValue = await typeTaskEdit.getProperty('value');
      let typeTaskEditAnswer = await typeTaskEditValue.jsonValue();
      expect(typeTaskEditAnswer).toBe('CSE 110');

      // Text Area Field
      const noteFieldEdit = await page.$('#noteFieldEdit');
      let noteFieldEditValue = await noteFieldEdit.getProperty('value');
      let noteFieldEditAnswer = await noteFieldEditValue.jsonValue();
      expect(noteFieldEditAnswer).toBe('My name is kaiserschmarren');
    });

    // Test #2 Edit data in the form, click submit then check if localstorage storage is correct
    // and check if data in table is correct
    it('Edit data in the form, click submit then check if localstorage is correct and table is correct', async() => {
      // Click on Edit Button of the newly added Task
      let editButton = await page.$('.editButton');
      await editButton.click();
      
      // Change the data for each input field
      // Task Name Field, change value to Task 2
      const taskNameEdit = await page.$('#taskNameFieldEdit');
      await page.$eval('#taskNameFieldEdit', el => el.value = 'Task 2');
      let taskNameEditValue = await taskNameEdit.getProperty('value');
      let taskNameAnswer = await taskNameEditValue.jsonValue();
      expect(taskNameAnswer).toBe('Task 2');

      // Hour Field
      const hourEdit = await page.$('#hourFieldEdit');
      await page.$eval('#hourFieldEdit', el => el.value = '1');
      let hourEditValue = await hourEdit.getProperty('value');
      let hourEditAnswer = await hourEditValue.jsonValue();
      expect(hourEditAnswer).toBe('1');

      // Minute Field
      const minEdit = await page.$('#minFieldEdit');
      await page.$eval('#minFieldEdit', el => el.value = '25');
      let minEditValue = await minEdit.getProperty('value');
      let minEditAnswer = await minEditValue.jsonValue();
      expect(minEditAnswer).toBe('25');

      // Type of Task Field
      const typeTaskEdit = await page.$('#typeTaskFieldEdit');
      await page.$eval('#typeTaskFieldEdit', el => el.value = 'CSE 101');
      let typeTaskEditValue = await typeTaskEdit.getProperty('value');
      let typeTaskEditAnswer = await typeTaskEditValue.jsonValue();
      expect(typeTaskEditAnswer).toBe('CSE 101');

      // Text Area Field
      const noteFieldEdit = await page.$('#noteFieldEdit');
      await page.$eval('#noteFieldEdit', el => el.value = 'I love E2E Testing');
      let noteFieldEditValue = await noteFieldEdit.getProperty('value');
      let noteFieldEditAnswer = await noteFieldEditValue.jsonValue();
      expect(noteFieldEditAnswer).toBe('I love E2E Testing');

      // Click Submit Button
      let submitButton = await page.$('.submitEditButton');

      // Had to use special click here
      await submitButton.evaluate(b => b.click());

      // IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
      await page.waitForNavigation();

      // Get the Item from local Storage
      const localStorage = await page.evaluate(() => localStorage.getItem('tasks'));
      const storageData = JSON.parse(localStorage);

      // Check if localStorage only has one task added
      var arrayFromStorage = await storageData;
      var arrayLength = await arrayFromStorage.length;
      expect(arrayLength).toBe(1);

      // Check if the localStorage contains new correct JSON data
      expect(arrayFromStorage[0].name).toBe('Task 2');
      expect(arrayFromStorage[0].hours).toBe('1');
      expect(arrayFromStorage[0].minutes).toBe('25');
      expect(arrayFromStorage[0].type).toBe('CSE 101');
      expect(arrayFromStorage[0].notes).toBe('I love E2E Testing');

      // Check if the data being displayed in table is the new data
      // Grab the ID of the data
      let taskID = arrayFromStorage[0].id;

      // Grab the data in the table row
      const data = await page.$$eval('table tr td', tds => tds.map((td) => {
        return td.innerText;
      }));

      // Check if the data in each td is correct
      expect(data[0]).toBe('Task 2');
      expect(data[1]).toBe('1 hr 25 min');
      expect(data[2]).toBe('Planned');
      expect(data[4]).toBe('I love E2E Testing');

      // Check that there are only 5 elements in the td now
      expect(data.length).toBe(5);
    });

    // Test #3 Edit data in the form, click cancel and check data in local storage did not change, 
    // check if data in table did not change
    it('Edit data in the form, click cancel then check if local storage and data in table did not change', async() => {
      // Click on Edit Button of the newly added Task
      let editButton = await page.$('.editButton');
      await editButton.click();

      // Change the data for each input field
      // Task Name Field, change value to Task 2
      const taskNameEdit = await page.$('#taskNameFieldEdit');
      await page.$eval('#taskNameFieldEdit', el => el.value = 'I Love Christmas');
      let taskNameEditValue = await taskNameEdit.getProperty('value');
      let taskNameAnswer = await taskNameEditValue.jsonValue();
      expect(taskNameAnswer).toBe('I Love Christmas');

      // Hour Field
      const hourEdit = await page.$('#hourFieldEdit');
      await page.$eval('#hourFieldEdit', el => el.value = '5');
      let hourEditValue = await hourEdit.getProperty('value');
      let hourEditAnswer = await hourEditValue.jsonValue();
      expect(hourEditAnswer).toBe('5');

      // Minute Field
      const minEdit = await page.$('#minFieldEdit');
      await page.$eval('#minFieldEdit', el => el.value = '10');
      let minEditValue = await minEdit.getProperty('value');
      let minEditAnswer = await minEditValue.jsonValue();
      expect(minEditAnswer).toBe('10');

      // Type of Task Field
      const typeTaskEdit = await page.$('#typeTaskFieldEdit');
      await page.$eval('#typeTaskFieldEdit', el => el.value = 'Chrstimas Eve');
      let typeTaskEditValue = await typeTaskEdit.getProperty('value');
      let typeTaskEditAnswer = await typeTaskEditValue.jsonValue();
      expect(typeTaskEditAnswer).toBe('Chrstimas Eve');

      // Text Area Field
      const noteFieldEdit = await page.$('#noteFieldEdit');
      await page.$eval('#noteFieldEdit', el => el.value = 'Christmas is near!');
      let noteFieldEditValue = await noteFieldEdit.getProperty('value');
      let noteFieldEditAnswer = await noteFieldEditValue.jsonValue();
      expect(noteFieldEditAnswer).toBe('Christmas is near!');

      // Click Cancel Button
      let cancelButton = await page.$('#cancelEditButton');

      // Had to use special click here
      await cancelButton.evaluate(b => b.click());

      // IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
      // This line is not needed as cancel does not reload the page
      // await page.waitForNavigation();

      // Get the Item from local Storage
      const localStorage = await page.evaluate(() => localStorage.getItem('tasks'));
      const storageData = JSON.parse(localStorage);

      // Check if localStorage only has one task added
      var arrayFromStorage = await storageData;
      var arrayLength = await arrayFromStorage.length;
      expect(arrayLength).toBe(1);

      // Check if the localStorage contains new correct JSON data
      expect(arrayFromStorage[0].name).toBe('Task 2');
      expect(arrayFromStorage[0].hours).toBe('1');
      expect(arrayFromStorage[0].minutes).toBe('25');
      expect(arrayFromStorage[0].type).toBe('CSE 101');
      expect(arrayFromStorage[0].notes).toBe('I love E2E Testing');

      // Check if the data being displayed in table is the new data
      // Grab the ID of the data
      let taskID = arrayFromStorage[0].id;

      // Grab the data in the table row
      const data = await page.$$eval('table tr td', tds => tds.map((td) => {
        return td.innerText;
      }));

      // Check if the data in each td is correct
      expect(data[0]).toBe('Task 2');
      expect(data[1]).toBe('1 hr 25 min');
      expect(data[2]).toBe('Planned');
      expect(data[4]).toBe('I love E2E Testing');

      // Check that there are only 5 elements in the td now
      expect(data.length).toBe(5);
    });

    // Test delete button
    it('Delete the task, check if local storage is empty', async() => {
      // Click on Edit Button of the newly added Task
      let editButton = await page.$('.editButton');
      await editButton.click();

      // Click Cancel Button
      let deleteButton = await page.$('.deleteEditButton');

      // Had to use special click here
      await deleteButton.click();

      // IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
      await page.waitForNavigation();

      const storage = await page.evaluate(() => {
        return window.localStorage.getItem('tasks')
      });
      expected = [];
      expect(storage).toBe(expected);
    })

    // Test adding 100 tasks
    it('Add 100 tasks, check if local storage and html are correct', async() => {

      for (let i = 0; i < 100; i += 1){
        // Grab the add button to click
        const addButton = await page.$('#addButton');
        await addButton.click();
        // selecting input fields
        const nameAdd = await page.$('#taskNameField');
        const hourAdd = await page.$('#hourField');
        const minAdd = await page.$('#minField');
        const typeAdd = await page.$('#typeTaskField');
        const noteAdd = await page.$('#noteField');

        // assigning input fields
        // adding name
        await page.$eval('#taskNameField', el => el.value = 'task');
        let nameAddValue = await nameAdd.getProperty('value');
        let nameAddAnswer = await nameAddValue.jsonValue();
        expect(nameAddAnswer).toBe('task');

        // adding hour
        await page.$eval('#hourField', el => el.value = '1');
        let hourAddValue = await hourAdd.getProperty('value');
        let hourAddAnswer = await hourAddValue.jsonValue();
        expect(hourAddAnswer).toBe('1');

        // adding minutes
        await page.$eval('#minField', el => el.value = '60');
        let minAddValue = await minAdd.getProperty('value');
        let minAddAnswer = await minAddValue.jsonValue();
        expect(minAddAnswer).toBe('60');

        // adding type
        await page.$eval('#typeTaskField', el => el.value = 'type');
        let typeAddValue = await typeAdd.getProperty('value');
        let typeAddAnswer = await typeAddValue.jsonValue();
        expect(typeAddAnswer).toBe('type');

        // adding note
        await page.$eval('#noteField', el => el.value = 'notes');
        let noteAddValue = await noteAdd.getProperty('value');
        let noteAddAnswer = await noteAddValue.jsonValue();
        expect(noteAddAnswer).toBe('notes');

        // Get the submit button and save task entry
        let submitButton = await page.$('#subButton');
        await submitButton.evaluate(b => b.click());
        
        // IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
        await page.waitForNavigation();
      }

      for (let i = 0; i < 100; i += 1){
        // Get the Item from local Storage
        const localStorage = await page.evaluate(() => localStorage.getItem('tasks'));
        const storageData = JSON.parse(localStorage);

        // Check if localStorage only has one task added
        var arrayFromStorage = await storageData;
        var arrayLength = await arrayFromStorage.length;
        expect(arrayLength).toBe(120);

        // Check if the localStorage contains new correct JSON data
        expect(arrayFromStorage[i].name).toBe('task');
        expect(arrayFromStorage[i].hours).toBe('1');
        expect(arrayFromStorage[i].minutes).toBe('60');
        expect(arrayFromStorage[i].type).toBe('type');
        expect(arrayFromStorage[i].notes).toBe('notes');
      }
    }, 1000000)

  });