// const puppeteer = require('puppeteer');
function delay(time) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time);
	});
}

describe("Basic user flow for Website", () => {
	// First, the website
	beforeAll(async () => {
		// const browser = await puppeteer.launch();
		await page.goto("https://cse110-fa22-group21.github.io/cse110-fa22-group21/");
	});

	// Create a task to test against localStorage data
	var tasks = [
		{
			name: "Task 1",
			hours: "10",
			minutes: "50",
			type: "CSE 110",
			notes: "My name is kaiserschmarren",
		},
	];
	const task = tasks[0];

	// Check to see that there are 0 tasks
	it("Initial Home Page - Check for 0 task names.", async () => {
		const storage = await page.evaluate(() => {
			return window.localStorage.getItem("tasks");
		});
		expected = null;
		expect(storage).toBe(expected);
	});

	// Add Team Testing
	// Add 1 - Add a data into the table using form
	it("ADD 1 - Click add button, fill form then click submit.", async () => {
		// Grab the add button to click
		const addButton = await page.$("#addButton");
		await addButton.click();

		// create JSHandle for task variable to be passed into pageFunction in evaluate()
		// returns value wrapped as in-page object
		const testTask = await page.evaluateHandle((task) => task, task);

		// Populate task data in input fields, starting w/ TaskName field
		const taskName = await page.$("#taskNameField");
		await page.evaluate(
			(taskName, testTask) => {
				taskName.setAttribute("value", testTask.name);
			},
			taskName,
			testTask
		);

		// Hour Field
		const hour = await page.$("#hourField");
		await page.evaluate(
			(hour, task) => {
				hour.setAttribute("value", task.hours);
			},
			hour,
			testTask
		);

		// Minute Field
		const min = await page.$("#minField");
		await page.evaluate(
			(min, task) => {
				min.setAttribute("value", task.minutes);
			},
			min,
			testTask
		);

		// Type of Task Field
		const typeTask = await page.$("#typeTaskField");
		await page.evaluate(
			(typeTask, task) => {
				typeTask.setAttribute("value", task.type);
			},
			typeTask,
			testTask
		);

		// Note Field
		const textArea = await page.$("#noteField");
		await page.evaluate(
			(textArea, task) => {
				textArea.innerText = task.notes;
			},
			textArea,
			testTask
		);

		// Get the submit button and save task entry
		let submitButton = await page.$("#subButton");
		await submitButton.click();

		// IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
		await page.waitForNavigation();

		// Get the Item from local Storage
		const localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
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
			});
		}
	});

	// ADD 2 - Click add data in the form, click cancel and check data in local storage did not change,
	// check if data in table did not change
	it("ADD 2 - Click Add in the form, click cancel then check if local storage and data in table did not change.", async () => {
		// Grab the add button to click
		const addButton = await page.$("#addButton");
		await addButton.click();

		// Change the data for each input field
		// Task Name Field, change value to Task 2
		const taskName = await page.$("#taskNameField");
		await page.$eval("#taskNameField", (el) => (el.value = "Task 2"));
		let taskNameValue = await taskName.getProperty("value");
		let taskNameAnswer = await taskNameValue.jsonValue();
		expect(taskNameAnswer).toBe("Task 2");

		// Hour Field
		const hour = await page.$("#hourField");
		await page.$eval("#hourField", (el) => (el.value = "10"));
		let hourValue = await hour.getProperty("value");
		let hourAnswer = await hourValue.jsonValue();
		expect(hourAnswer).toBe("10");

		// Minute Field
		const min = await page.$("#minField");
		await page.$eval("#minField", (el) => (el.value = "5"));
		let minValue = await min.getProperty("value");
		let minAnswer = await minValue.jsonValue();
		expect(minAnswer).toBe("5");

		// Type of Task Field
		const typeTask = await page.$("#typeTaskField");
		await page.$eval("#typeTaskField", (el) => (el.value = "CSE 101"));
		let typeTaskValue = await typeTask.getProperty("value");
		let typeTaskAnswer = await typeTaskValue.jsonValue();
		expect(typeTaskAnswer).toBe("CSE 101");

		// Text Area Field
		const noteField = await page.$("#noteField");
		await page.$eval("#noteField", (el) => (el.value = "I love E2E Testing"));
		let noteFieldValue = await noteField.getProperty("value");
		let noteFieldAnswer = await noteFieldValue.jsonValue();
		expect(noteFieldAnswer).toBe("I love E2E Testing");

		// Click Cancel Button
		let cancelButton = await page.$("#cancelButton");

		// Had to use special click here
		await cancelButton.evaluate((b) => b.click());

		// Get the Item from local Storage
		const localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		const storageData = JSON.parse(localStorage);

		// Check if localStorage only has one task added
		var arrayFromStorage = await storageData;
		var arrayLength = await arrayFromStorage.length;
		expect(arrayLength).toBe(1);

		// Check if the localStorage contains new correct JSON data
		expect(arrayFromStorage[0].name).toBe("Task 1");
		expect(arrayFromStorage[0].hours).toBe("10");
		expect(arrayFromStorage[0].minutes).toBe("50");
		expect(arrayFromStorage[0].type).toBe("CSE 110");
		expect(arrayFromStorage[0].notes).toBe("My name is kaiserschmarren");

		// Check if the data being displayed in table is the new data
		// Grab the ID of the data
		let taskID = arrayFromStorage[0].id;

		// Grab the data in the table row
		const data = await page.$$eval("table tr td", (tds) =>
			tds.map((td) => {
				return td.innerText;
			})
		);

		// Check if the data in each td is correct
		expect(data[0]).toBe("Task 1");
		expect(data[1]).toBe("10 hr 50 min");
		expect(data[2]).toBe("Planned");
		expect(data[4]).toBe("My name is kaiserschmarren");

		// Check that there are only 5 elements in the td now
		expect(data.length).toBe(5);
	});

	// Add 3 - Click add data but set minute and hour fields to be invalid such as negative numbers, click submit then check if table data changed and check if local storage changed
	it("ADD 3 - Click data in the form but fill minutes and hours fields as negative numbers, click submit then check if localstorage is correct and table is correct.", async () => {
		// Grab the add button to click
		const addButton = await page.$("#addButton");
		await addButton.click();

		// Change the data for each input field
		// Task Name Field, change value to Task 2
		const taskName = await page.$("#taskNameField");
		await page.$eval("#taskNameField", (el) => (el.value = "Task 2"));
		let taskNameValue = await taskName.getProperty("value");
		let taskNameAnswer = await taskNameValue.jsonValue();
		expect(taskNameAnswer).toBe("Task 2");

		// Hour Field
		const hour = await page.$("#hourField");
		await page.$eval("#hourField", (el) => (el.value = "-10"));
		let hourValue = await hour.getProperty("value");
		let hourAnswer = await hourValue.jsonValue();
		expect(hourAnswer).toBe("-10");

		// Minute Field
		const min = await page.$("#minField");
		await page.$eval("#minField", (el) => (el.value = "-5"));
		let minValue = await min.getProperty("value");
		let minAnswer = await minValue.jsonValue();
		expect(minAnswer).toBe("-5");

		// Type of Task Field
		const typeTask = await page.$("#typeTaskField");
		await page.$eval("#typeTaskField", (el) => (el.value = "CSE 101"));
		let typeTaskValue = await typeTask.getProperty("value");
		let typeTaskAnswer = await typeTaskValue.jsonValue();
		expect(typeTaskAnswer).toBe("CSE 101");

		// Text Area Field
		const noteField = await page.$("#noteField");
		await page.$eval("#noteField", (el) => (el.value = "I love E2E Testing"));
		let noteFieldValue = await noteField.getProperty("value");
		let noteFieldAnswer = await noteFieldValue.jsonValue();
		expect(noteFieldAnswer).toBe("I love E2E Testing");

		// Warning popup will show, click ok
		page.on("dialog", async (dialog) => {
			await dialog.accept();
		});

		// Get the submit button and save task entry
		let submitButton = await page.$("#subButton");
		await submitButton.click();

		// IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
		await page.waitForNavigation();

		// Get the Item from local Storage
		const localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		const storageData = JSON.parse(localStorage);

		// Check if localStorage only has one task, so the negative valued tasks was not added
		var arrayFromStorage = await storageData;
		var arrayLength = await arrayFromStorage.length;
		expect(arrayLength).toBe(1);

		// Check if the localStorage contains new correct JSON data
		expect(arrayFromStorage[0].name).toBe("Task 1");
		expect(arrayFromStorage[0].hours).toBe("10");
		expect(arrayFromStorage[0].minutes).toBe("50");
		expect(arrayFromStorage[0].type).toBe("CSE 110");
		expect(arrayFromStorage[0].notes).toBe("My name is kaiserschmarren");

		// Check if the data being displayed in table is the new data
		// Grab the ID of the data
		let taskID = arrayFromStorage[0].id;

		// Grab the data in the table row
		const data = await page.$$eval("table tr td", (tds) =>
			tds.map((td) => {
				return td.innerText;
			})
		);

		// Check if the data in each td is correct
		expect(data[0]).toBe("Task 1");
		expect(data[1]).toBe("10 hr 50 min");
		expect(data[2]).toBe("Planned");
		expect(data[4]).toBe("My name is kaiserschmarren");

		// Check that there are only 5 elements in the td now
		expect(data.length).toBe(5);
	});

	// Edit Team Testing
	// Edit 1 - Checking that edit form brings up correct data when edit button is clicked
	it("EDIT 1 - Click edit button then check if form is populated correctly.", async () => {
		// Click on Edit Button of the newly added Task
		let editButton = await page.$(".editButton");
		await editButton.click();

		// Check to make sure fields are correct
		// Task Name Field
		const taskNameEdit = await page.$("#taskNameFieldEdit");
		let taskNameEditValue = await taskNameEdit.getProperty("value");
		let taskNameAnswer = await taskNameEditValue.jsonValue();
		expect(taskNameAnswer).toBe("Task 1");

		// Hour Field
		const hourEdit = await page.$("#hourFieldEdit");
		let hourEditValue = await hourEdit.getProperty("value");
		let hourEditAnswer = await hourEditValue.jsonValue();
		expect(hourEditAnswer).toBe("10");

		// Minute Field
		const minEdit = await page.$("#minFieldEdit");
		let minEditValue = await minEdit.getProperty("value");
		let minEditAnswer = await minEditValue.jsonValue();
		expect(minEditAnswer).toBe("50");

		// Type of Task Field
		const typeTaskEdit = await page.$("#typeTaskFieldEdit");
		let typeTaskEditValue = await typeTaskEdit.getProperty("value");
		let typeTaskEditAnswer = await typeTaskEditValue.jsonValue();
		expect(typeTaskEditAnswer).toBe("CSE 110");

		// Text Area Field
		const noteFieldEdit = await page.$("#noteFieldEdit");
		let noteFieldEditValue = await noteFieldEdit.getProperty("value");
		let noteFieldEditAnswer = await noteFieldEditValue.jsonValue();
		expect(noteFieldEditAnswer).toBe("My name is kaiserschmarren");
	});

	// Edit 1.1 - Edit data in the form, click submit then check if localstorage storage is correct
	// and check if data in table is correct
	it("EDIT 1.1 - Edit data in the form, click submit then check if localstorage is correct and table is correct.", async () => {
		// Click on Edit Button of the newly added Task
		let editButton = await page.$(".editButton");
		await editButton.click();

		// Change the data for each input field
		// Task Name Field, change value to Task 2
		const taskNameEdit = await page.$("#taskNameFieldEdit");
		await page.$eval("#taskNameFieldEdit", (el) => (el.value = "Task 2"));
		let taskNameEditValue = await taskNameEdit.getProperty("value");
		let taskNameAnswer = await taskNameEditValue.jsonValue();
		expect(taskNameAnswer).toBe("Task 2");

		// Hour Field
		const hourEdit = await page.$("#hourFieldEdit");
		await page.$eval("#hourFieldEdit", (el) => (el.value = "1"));
		let hourEditValue = await hourEdit.getProperty("value");
		let hourEditAnswer = await hourEditValue.jsonValue();
		expect(hourEditAnswer).toBe("1");

		// Minute Field
		const minEdit = await page.$("#minFieldEdit");
		await page.$eval("#minFieldEdit", (el) => (el.value = "25"));
		let minEditValue = await minEdit.getProperty("value");
		let minEditAnswer = await minEditValue.jsonValue();
		expect(minEditAnswer).toBe("25");

		// Type of Task Field
		const typeTaskEdit = await page.$("#typeTaskFieldEdit");
		await page.$eval("#typeTaskFieldEdit", (el) => (el.value = "CSE 101"));
		let typeTaskEditValue = await typeTaskEdit.getProperty("value");
		let typeTaskEditAnswer = await typeTaskEditValue.jsonValue();
		expect(typeTaskEditAnswer).toBe("CSE 101");

		// Text Area Field
		const noteFieldEdit = await page.$("#noteFieldEdit");
		await page.$eval("#noteFieldEdit", (el) => (el.value = "I love E2E Testing"));
		let noteFieldEditValue = await noteFieldEdit.getProperty("value");
		let noteFieldEditAnswer = await noteFieldEditValue.jsonValue();
		expect(noteFieldEditAnswer).toBe("I love E2E Testing");

		// Click Submit Button
		let submitButton = await page.$(".submitEditButton");

		// Had to use special click here
		await submitButton.evaluate((b) => b.click());

		// IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
		await page.waitForNavigation();

		// Get the Item from local Storage
		const localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		const storageData = JSON.parse(localStorage);

		// Check if localStorage only has one task added
		var arrayFromStorage = await storageData;
		var arrayLength = await arrayFromStorage.length;
		expect(arrayLength).toBe(1);

		// Check if the localStorage contains new correct JSON data
		expect(arrayFromStorage[0].name).toBe("Task 2");
		expect(arrayFromStorage[0].hours).toBe("1");
		expect(arrayFromStorage[0].minutes).toBe("25");
		expect(arrayFromStorage[0].type).toBe("CSE 101");
		expect(arrayFromStorage[0].notes).toBe("I love E2E Testing");

		// Check if the data being displayed in table is the new data
		// Grab the ID of the data
		let taskID = arrayFromStorage[0].id;

		// Grab the data in the table row
		const data = await page.$$eval("table tr td", (tds) =>
			tds.map((td) => {
				return td.innerText;
			})
		);

		// Check if the data in each td is correct
		expect(data[0]).toBe("Task 2");
		expect(data[1]).toBe("1 hr 25 min");
		expect(data[2]).toBe("Planned");
		expect(data[4]).toBe("I love E2E Testing");

		// Check that there are only 5 elements in the td now
		expect(data.length).toBe(5);
	});

	// Edit 2 - Edit data in the form, click cancel and check data in local storage did not change,
	// check if data in table did not change
	it("EDIT 2 - Edit data in the form, click cancel then check if local storage and data in table did not change.", async () => {
		// Click on Edit Button of the newly added Task
		let editButton = await page.$(".editButton");
		await editButton.click();

		// Change the data for each input field
		// Task Name Field, change value to Task 2
		const taskNameEdit = await page.$("#taskNameFieldEdit");
		await page.$eval("#taskNameFieldEdit", (el) => (el.value = "I Love Christmas"));
		let taskNameEditValue = await taskNameEdit.getProperty("value");
		let taskNameAnswer = await taskNameEditValue.jsonValue();
		expect(taskNameAnswer).toBe("I Love Christmas");

		// Hour Field
		const hourEdit = await page.$("#hourFieldEdit");
		await page.$eval("#hourFieldEdit", (el) => (el.value = "5"));
		let hourEditValue = await hourEdit.getProperty("value");
		let hourEditAnswer = await hourEditValue.jsonValue();
		expect(hourEditAnswer).toBe("5");

		// Minute Field
		const minEdit = await page.$("#minFieldEdit");
		await page.$eval("#minFieldEdit", (el) => (el.value = "10"));
		let minEditValue = await minEdit.getProperty("value");
		let minEditAnswer = await minEditValue.jsonValue();
		expect(minEditAnswer).toBe("10");

		// Type of Task Field
		const typeTaskEdit = await page.$("#typeTaskFieldEdit");
		await page.$eval("#typeTaskFieldEdit", (el) => (el.value = "Chrstimas Eve"));
		let typeTaskEditValue = await typeTaskEdit.getProperty("value");
		let typeTaskEditAnswer = await typeTaskEditValue.jsonValue();
		expect(typeTaskEditAnswer).toBe("Chrstimas Eve");

		// Text Area Field
		const noteFieldEdit = await page.$("#noteFieldEdit");
		await page.$eval("#noteFieldEdit", (el) => (el.value = "Christmas is near!"));
		let noteFieldEditValue = await noteFieldEdit.getProperty("value");
		let noteFieldEditAnswer = await noteFieldEditValue.jsonValue();
		expect(noteFieldEditAnswer).toBe("Christmas is near!");

		// Click Cancel Button
		let cancelButton = await page.$("#cancelEditButton");

		// Had to use special click here
		await cancelButton.evaluate((b) => b.click());

		// Get the Item from local Storage
		const localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		const storageData = JSON.parse(localStorage);

		// Check if localStorage only has one task added
		var arrayFromStorage = await storageData;
		var arrayLength = await arrayFromStorage.length;
		expect(arrayLength).toBe(1);

		// Check if the localStorage contains new correct JSON data
		expect(arrayFromStorage[0].name).toBe("Task 2");
		expect(arrayFromStorage[0].hours).toBe("1");
		expect(arrayFromStorage[0].minutes).toBe("25");
		expect(arrayFromStorage[0].type).toBe("CSE 101");
		expect(arrayFromStorage[0].notes).toBe("I love E2E Testing");

		// Check if the data being displayed in table is the new data
		// Grab the ID of the data
		let taskID = arrayFromStorage[0].id;

		// Grab the data in the table row
		const data = await page.$$eval("table tr td", (tds) =>
			tds.map((td) => {
				return td.innerText;
			})
		);

		// Check if the data in each td is correct
		expect(data[0]).toBe("Task 2");
		expect(data[1]).toBe("1 hr 25 min");
		expect(data[2]).toBe("Planned");
		expect(data[4]).toBe("I love E2E Testing");

		// Check that there are only 5 elements in the td now
		expect(data.length).toBe(5);
	});

	// Edit 3 - Click edit data but set minute and hour fields to be invalid such as negative numbers, click submit then check if table data changed and check if local storage changed
	it("EDIT 3 - Edit data in the form but fill minutes and hours fields as negative numbers, click submit then check if localstorage is correct and table is correct.", async () => {
		// Click on Edit Button of the newly added Task
		let editButton = await page.$(".editButton");
		await editButton.click();

		// Change the data for each input field
		// Task Name Field, change value to Task 2
		const taskNameEdit = await page.$("#taskNameFieldEdit");
		await page.$eval("#taskNameFieldEdit", (el) => (el.value = "Task 2"));
		let taskNameEditValue = await taskNameEdit.getProperty("value");
		let taskNameAnswer = await taskNameEditValue.jsonValue();
		expect(taskNameAnswer).toBe("Task 2");

		// Hour Field
		const hourEdit = await page.$("#hourFieldEdit");
		await page.$eval("#hourFieldEdit", (el) => (el.value = "-10"));
		let hourEditValue = await hourEdit.getProperty("value");
		let hourEditAnswer = await hourEditValue.jsonValue();
		expect(hourEditAnswer).toBe("-10");

		// Minute Field
		const minEdit = await page.$("#minFieldEdit");
		await page.$eval("#minFieldEdit", (el) => (el.value = "-5"));
		let minEditValue = await minEdit.getProperty("value");
		let minEditAnswer = await minEditValue.jsonValue();
		expect(minEditAnswer).toBe("-5");

		// Type of Task Field
		const typeTaskEdit = await page.$("#typeTaskFieldEdit");
		await page.$eval("#typeTaskFieldEdit", (el) => (el.value = "CSE 101"));
		let typeTaskEditValue = await typeTaskEdit.getProperty("value");
		let typeTaskEditAnswer = await typeTaskEditValue.jsonValue();
		expect(typeTaskEditAnswer).toBe("CSE 101");

		// Text Area Field
		const noteFieldEdit = await page.$("#noteFieldEdit");
		await page.$eval("#noteFieldEdit", (el) => (el.value = "I love E2E Testing"));
		let noteFieldEditValue = await noteFieldEdit.getProperty("value");
		let noteFieldEditAnswer = await noteFieldEditValue.jsonValue();
		expect(noteFieldEditAnswer).toBe("I love E2E Testing");

		// Click Submit Button
		let submitButton = await page.$(".submitEditButton");

		// Had to use special click here
		await submitButton.evaluate((b) => b.click());

		// IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
		await page.waitForNavigation();

		// Get the Item from local Storage
		const localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		const storageData = JSON.parse(localStorage);

		// Check if localStorage only has one task added
		var arrayFromStorage = await storageData;
		var arrayLength = await arrayFromStorage.length;
		expect(arrayLength).toBe(1);

		// Check if the localStorage contains new correct JSON data
		expect(arrayFromStorage[0].name).toBe("Task 2");
		expect(arrayFromStorage[0].hours).toBe("1");
		expect(arrayFromStorage[0].minutes).toBe("25");
		expect(arrayFromStorage[0].type).toBe("CSE 101");
		expect(arrayFromStorage[0].notes).toBe("I love E2E Testing");

		// Check if the data being displayed in table is the new data
		// Grab the ID of the data
		let taskID = arrayFromStorage[0].id;

		// Grab the data in the table row
		const data = await page.$$eval("table tr td", (tds) =>
			tds.map((td) => {
				return td.innerText;
			})
		);

		// Check if the data in each td is correct
		expect(data[0]).toBe("Task 2");
		expect(data[1]).toBe("1 hr 25 min");
		expect(data[2]).toBe("Planned");
		expect(data[4]).toBe("I love E2E Testing");

		// Check that there are only 5 elements in the td now
		expect(data.length).toBe(5);
	});

	// TEAM 1 - MAIN PAGE 1 - Click reset button task hasnt been started , check that data.status has correct value, start, finish tiemstamp empty
	it("TEAM 1 - MAIN PAGE 1 - Click Reset Button (Task Not Started), check JSON fields are correct.", async () => {
		// Get the Item from local Storage
		let localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		let storageData = JSON.parse(localStorage);
		var arrayFromStorage = await storageData;

		// Check that the value of .started is false, start is undefined, status is Planned
		expect(arrayFromStorage[0].started).toBe(false);
		expect(arrayFromStorage[0].start).toBe(undefined);
		expect(arrayFromStorage[0].status).toBe("Planned");
		let editButton = await page.$(".editButton");
		await editButton.click();

		// await page.waitForNavigation();
		let resetButton = await page.$(`#resetButton`);
		await resetButton.click();
		await page.waitForNavigation();
		localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		storageData = JSON.parse(localStorage);
		arrayFromStorage = await storageData;

		// Check that the value of .started is true, start is undefined, status is Planned
		expect(arrayFromStorage[0].started).toBe(false);
		expect(arrayFromStorage[0].start).toBe("");
		expect(arrayFromStorage[0].status).toBe("Planned");
	});

	// TEAM 1 - MAIN PAGE 2 - Click reset button when task has beeen started , check that data.status has correct value, start,finish timestamp empty
	it("TEAM 1 - MAIN PAGE 2 - Click Reset Button (Task Started), check JSON fields are correct.", async () => {
		// Get the Item from local Storage
		let localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		let storageData = JSON.parse(localStorage);
		var arrayFromStorage = await storageData;

		// Click start button
		let startButton = await page.$(`#startButton${arrayFromStorage[0].id}`);
		await startButton.click();
		await page.waitForNavigation();
		localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		storageData = JSON.parse(localStorage);
		arrayFromStorage = await storageData;

		// Check that the value of started is true, start is not undefined, status is In-Progress
		expect(arrayFromStorage[0].started).toBe(true);
		expect(arrayFromStorage[0].start != undefined).toBe(true);
		expect(arrayFromStorage[0].status).toBe("In-Progress");

		// click edit to bring up menu then click reset
		let editButton = await page.$(".editButton");
		await editButton.click();
		let resetButton = await page.$(`#resetButton`);
		await resetButton.click();
		await page.waitForNavigation();

		// Get the Item from local Storage
		localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		storageData = JSON.parse(localStorage);
		arrayFromStorage = await storageData;

		// Check that the value of .started is true, start is blank string, status is Planned
		expect(arrayFromStorage[0].started).toBe(false);
		expect(arrayFromStorage[0].start).toBe("");
		expect(arrayFromStorage[0].status).toBe("Planned");
	});

	// TEAM 1 - MAIN PAGE 3 - Click start button, check that data.finished, data.status has correct values
	it("TEAM 1 - MAIN PAGE 3 - Click Start Button, check JSON fields are correct.", async () => {
		// Get the Item from local Storage
		let localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		const storageData = JSON.parse(localStorage);
		var arrayFromStorage = await storageData;

		// Check that the value of .started is false, start is undefined, status is Planned
		expect(arrayFromStorage[0].started).toBe(false);
		expect(arrayFromStorage[0].start).toBe("");
		expect(arrayFromStorage[0].status).toBe("Planned");

		// Click on End Button of the newly added Task
		let startButton = await page.$(`#startButton${arrayFromStorage[0].id}`);
		await startButton.click();

		// IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
		await page.waitForNavigation();

		localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		const updatedData = await JSON.parse(localStorage);

		// Check that the value of started is true, start is not undefined, status is In-Progress
		expect(updatedData[0].started).toBe(true);
		expect(updatedData[0].start != undefined).toBe(true);
		expect(updatedData[0].status).toBe("In-Progress");
	});

	// TEAM 1 - MAIN PAGE 4 - Click end button, check the data fields has updated values
	it("TEAM 1 - MAIN PAGE 4 - Click Finish button, check JSON fields are correct.", async () => {
		// Get the Item from local Storage
		let localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		const storageData = JSON.parse(localStorage);
		var arrayFromStorage = await storageData;

		// Check that the value of .started is true, end is undefined, status is In-Progress and finished is false
		expect(arrayFromStorage[0].started).toBe(true);
		expect(arrayFromStorage[0].end).toBe(undefined);
		expect(arrayFromStorage[0].status).toBe("In-Progress");
		expect(arrayFromStorage[0].finished).toBe(false);

		// Click on Start Button of the newly added Task
		let startButton = await page.$(`#startButton${arrayFromStorage[0].id}`);
		await startButton.click();

		// IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
		await page.waitForNavigation();

		localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		const updatedData = await JSON.parse(localStorage);

		// Check that the value of finished is true, end is not undefined, status is Completed
		expect(updatedData[0].finished).toBe(true);
		expect(updatedData[0].end != undefined).toBe(true);
		expect(updatedData[0].status).toBe("Completed");

		// Check to see if table is now empty
		// Grab the data in the table row
		const data = await page.$$eval("table tr td", (tds) =>
			tds.map((td) => {
				return td.innerText;
			})
		);
		// data should be empty since it is not loaded to the table
		expect(data).toEqual([]);
	});

	// TEAM 3 - ANALYTICS PAGE 1 - Clear local storage, add and complete one task, check if it appear in analytics
	it("TEAM 3 - ANALYTICS PAGE 1 - Clear local storage, add and complete one task, check if it appear in analytics.", async () => {
		//clear local storage
		await page.evaluate(() => {
			window.localStorage.clear();
		});

		// Grab the add button to click
		const addButton = await page.$("#addButton");
		await addButton.click();

		// assigning input fields
		// adding name
		await page.$eval("#taskNameField", (el) => (el.value = "AnalyticTask"));

		// adding hour
		await page.$eval("#hourField", (el) => (el.value = "4"));

		// adding minutes
		await page.$eval("#minField", (el) => (el.value = "30"));

		// adding type
		await page.$eval("#typeTaskField", (el) => (el.value = "FirstTask"));

		// adding note
		await page.$eval("#noteField", (el) => (el.value = "First Analytic Task!"));

		// Get the submit button and save task entry
		let submitButton = await page.$("#subButton");
		await submitButton.evaluate((b) => b.click());

		// IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
		await page.waitForNavigation();

		// Get the Item from local Storage
		let localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		let storageData = await JSON.parse(localStorage);
		var arrayFromStorage = await storageData;

		// clicking start button for every task
		const id = await arrayFromStorage[0].id;
		let startButton = await page.$(`#startButton${id}`);
		await startButton.click();

		// IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
		await page.waitForNavigation();

		startButton = await page.$(`#startButton${id}`);
		await startButton.click();

		// IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
		await page.waitForNavigation();

		// Visit Analytic Page
		await page.goto("https://cse110-fa22-group21.github.io/cse110-fa22-group21/analytics.html");

		// Grab the data in the table row
		const data = await page.$$eval("table tr td", (tds) =>
			tds.map((td) => {
				return td.innerText;
			})
		);

		// Check if the data in each td is correct
		expect(data[0]).toBe("AnalyticTask");
		expect(data[1]).toBe("4 hr 30 min");
		expect(data[2]).toBe("0 hr 1 min");
		// thrid element is the emoji reaction
		// fourth element is the notes
		expect(data[4]).toBe("First Analytic Task!");

		// Check that there are only 5 elements in the td now
		expect(data.length).toBe(5);
	}, 1000000);

	// TODO TEAM 2 - LOG PAGE 1
	// PLEASE DO THE FIRST TEST HERE - REFER TO THINGS TO TEST DOCUMENT
	it("TEAM 2 - LOG PAGE 1 -check if it appear in log.", async () => {
		// Visit Analytic Page
		await page.goto("https://cse110-fa22-group21.github.io/cse110-fa22-group21/log.html");

		// Grab the data in the table row
		const data = await page.$$eval("table tr td", (tds) =>
			tds.map((td) => {
				return td.innerText;
			})
		);

		// Check if the data in each td is correct
		expect(data[0]).toBe("AnalyticTask");
		expect(data[1]).toBe("FirstTask");

		// Check that there are only 3 elements in the td now
		expect(data.length).toBe(3);
	}, 1000000);

	//-------------------------------------------------------------------------------------------------------------------------DELETE TEAM
	// DELETE 1 - Clear local storage, add a task, remove it, and check if the local storage is empty
	it("DELETE 1 - Edit data in the form, click submit then check if localstorage is correct and table is correct.", async () => {
		// We were in Analytics Page, so visit Home Page
		await page.goto("https://cse110-fa22-group21.github.io/cse110-fa22-group21/");

		// Clear local storage
		await page.evaluate(() => {
			return window.localStorage.clear();
		});

		for (let i = 0; i < 4; i++) {
			// Grab the add button to click
			const addButton = await page.$("#addButton");
			await addButton.click();

			// create JSHandle for task variable to be passed into pageFunction in evaluate()
			// returns value wrapped as in-page object
			const testTask = await page.evaluateHandle((task) => task, task);

			// Populate task data in input fields, starting w/ TaskName field
			const taskName = await page.$("#taskNameField");
			await page.evaluate(
				(taskName, testTask) => {
					taskName.setAttribute("value", testTask.name);
				},
				taskName,
				testTask
			);

			// Hour Field
			const hour = await page.$("#hourField");
			await page.evaluate(
				(hour, task) => {
					hour.setAttribute("value", task.hours);
				},
				hour,
				testTask
			);

			// Minute Field
			const min = await page.$("#minField");
			await page.evaluate(
				(min, task) => {
					min.setAttribute("value", task.minutes);
				},
				min,
				testTask
			);

			// Type of Task Field
			const typeTask = await page.$("#typeTaskField");
			await page.evaluate(
				(typeTask, task) => {
					typeTask.setAttribute("value", task.type);
				},
				typeTask,
				testTask
			);

			// Note Field
			const textArea = await page.$("#noteField");
			await page.evaluate(
				(textArea, task) => {
					textArea.innerText = task.notes;
				},
				textArea,
				testTask
			);

			// Get the submit button and save task entry
			let submitButton = await page.$("#subButton");
			await submitButton.click();

			// IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
			await page.waitForNavigation();
		}

		// Check that there is one task in the table
		const dataPop = await page.$$eval("table tr td", (tds) =>
			tds.map((td) => {
				return td.innerText;
			})
		);
		expect(dataPop.length).toBe(20);

		// Get tasks from local Storage
		let localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		let storageData = JSON.parse(localStorage);

		// Check if there is one task localStorage
		var arrayFromStorage = await storageData;
		var arrayLength = await arrayFromStorage.length;
		expect(arrayLength).toBe(4);

		const idToBeDeleted = arrayFromStorage[0].id;

		// Click on Edit Button of the newly added Task
		let editButton = await page.$("#editButton" + idToBeDeleted);
		await editButton.click();

		// Click delete Button
		await page.evaluate(() => {
			document.getElementsByClassName("deleteEditButton")[0].click();
		});

		// IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
		await page.waitForNavigation();

		// Get tasks from local Storage
		localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		storageData = JSON.parse(localStorage);

		// Check that there is no data in the table
		const data = await page.$$eval("table tr td", (tds) =>
			tds.map((td) => {
				return td.innerText;
			})
		);
		expect(data.length).toBe(15);

		// Check if localStorage is empty
		var arrayFromStorage = await storageData;
		var arrayLength = await arrayFromStorage.length;
		expect(arrayLength).toBe(3);

		expect(arrayFromStorage.some((x) => x.id == idToBeDeleted)).toBe(false);
	});

	// TEAM 1 - MAINPAGE 5 - Populate data with 101 tasks
	it("TEAM 1 - MAIN PAGE 5 - Add 101 tasks, check if local storage only stored 100 tasks.", async () => {
		//clear local storage
		await page.evaluate(() => {
			window.localStorage.clear();
		});

		// go back to main page
		await page.goto("https://cse110-fa22-group21.github.io/cse110-fa22-group21/");

		for (let i = 0; i < 101; i += 1) {
			// Grab the add button to click
			const addButton = await page.$("#addButton");
			await addButton.click();
			// selecting input fields
			const nameAdd = await page.$("#taskNameField");
			const hourAdd = await page.$("#hourField");
			const minAdd = await page.$("#minField");
			const typeAdd = await page.$("#typeTaskField");
			const noteAdd = await page.$("#noteField");

			// assigning input fields
			// adding name
			await page.$eval("#taskNameField", (el) => (el.value = "task"));
			let nameAddValue = await nameAdd.getProperty("value");
			let nameAddAnswer = await nameAddValue.jsonValue();
			expect(nameAddAnswer).toBe("task");

			// adding hour
			await page.$eval("#hourField", (el) => (el.value = "1"));
			let hourAddValue = await hourAdd.getProperty("value");
			let hourAddAnswer = await hourAddValue.jsonValue();
			expect(hourAddAnswer).toBe("1");

			// adding minutes
			await page.$eval("#minField", (el) => (el.value = "60"));
			let minAddValue = await minAdd.getProperty("value");
			let minAddAnswer = await minAddValue.jsonValue();
			expect(minAddAnswer).toBe("60");

			// adding type
			await page.$eval("#typeTaskField", (el) => (el.value = "type"));
			let typeAddValue = await typeAdd.getProperty("value");
			let typeAddAnswer = await typeAddValue.jsonValue();
			expect(typeAddAnswer).toBe("type");

			// adding note
			await page.$eval("#noteField", (el) => (el.value = "notes"));
			let noteAddValue = await noteAdd.getProperty("value");
			let noteAddAnswer = await noteAddValue.jsonValue();
			expect(noteAddAnswer).toBe("notes");

			// Get the submit button and save task entry
			let submitButton = await page.$("#subButton");
			await submitButton.evaluate((b) => b.click());

			// IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
			await page.waitForNavigation();
		}
		// Get the Item from local Storage
		const localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		const storageData = await JSON.parse(localStorage);

		// Check if localStorage has 100 task added
		var arrayFromStorage = await storageData;
		var arrayLength = await arrayFromStorage.length;
		expect(arrayLength).toBe(100);

		for (let i = 0; i < 100; i += 1) {
			// Check if the localStorage contains new correct JSON data
			expect(arrayFromStorage[i].name).toBe("task");
			expect(arrayFromStorage[i].hours).toBe("1");
			expect(arrayFromStorage[i].minutes).toBe("60");
			expect(arrayFromStorage[i].type).toBe("type");
			expect(arrayFromStorage[i].notes).toBe("notes");
		}
	}, 1000000);

	// Testing for clicking start button
	it("Click start button for each task, check if field .started changed", async () => {
		// Get the Item from local Storage
		let localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		let storageData = await JSON.parse(localStorage);

		// Check if localStorage has 100 task added
		var arrayFromStorage = await storageData;
		var arrayLength = await arrayFromStorage.length;
		expect(arrayLength).toBe(100);

		// clicking start button for every task
		for (let i = 0; i < 100; i++) {
			const id = arrayFromStorage[i].id;
			const startButton = await page.$(`#startButton${id}`);
			await startButton.click();

			// IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
			await page.waitForNavigation();
		}

		// Get the Item from local Storage
		localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		storageData = await JSON.parse(localStorage);

		// Check if localStorage has 100 task added
		arrayFromStorage = await storageData;
		arrayLength = await arrayFromStorage.length;
		expect(arrayLength).toBe(100);

		// checking if the field .started for each task changed
		for (let i = 0; i < 100; i++) {
			const startStatus = arrayFromStorage[i].started;
			const finishStatus = arrayFromStorage[i].finished;

			expect(startStatus).toBe(true);
			expect(finishStatus).toBe(false);
		}
	}, 1000000);

	// Testing for clicking finish button
	it("Click finish button for each task, check if field .fnished changed", async () => {
		// Get the Item from local Storage
		let localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		let storageData = JSON.parse(localStorage);

		// Check if localStorage only has one task added
		var arrayFromStorage = await storageData;
		var arrayLength = await arrayFromStorage.length;
		expect(arrayLength).toBe(100);

		// clicking start button for every task
		for (let i = 0; i < 100; i++) {
			const id = arrayFromStorage[i].id;
			const finishButton = await page.$(`#startButton${id}`);
			await finishButton.click();

			// IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
			await page.waitForNavigation();
		}

		// Get the Item from local Storage
		localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		storageData = await JSON.parse(localStorage);

		// Check if localStorage has 100 task added
		arrayFromStorage = await storageData;
		arrayLength = await arrayFromStorage.length;
		expect(arrayLength).toBe(100);

		// checking if the field .started for each task changed
		for (let i = 0; i < 100; i++) {
			const startStatus = arrayFromStorage[i].started;
			const finishStatus = arrayFromStorage[i].finished;

			expect(startStatus).toBe(true);
			expect(finishStatus).toBe(true);
		}
	}, 1000000);

	// TEAM 3 - ANALYTICS PAGE 2 - After 100 task being complete, Check if the oldest one is removed from table
	it("TEAM 3 - ANALYTICS PAGE 2 - After 100 task being complete, Check if the oldest one is removed from table", async () => {
		// Grab the add button to click
		const addButton = await page.$("#addButton");
		await addButton.click();

		// assigning input fields
		// adding name
		await page.$eval("#taskNameField", (el) => (el.value = "Check Limits Task"));

		// adding hour
		await page.$eval("#hourField", (el) => (el.value = "6"));

		// adding minutes
		await page.$eval("#minField", (el) => (el.value = "15"));

		// adding type
		await page.$eval("#typeTaskField", (el) => (el.value = "LimitsTask"));

		// adding note
		await page.$eval("#noteField", (el) => (el.value = "Checking the Maximum Task"));

		// Get the submit button and save task entry
		let submitButton = await page.$("#subButton");
		await submitButton.evaluate((b) => b.click());

		// IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
		await page.waitForNavigation();

		// Get the Item from local Storage
		let localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		let storageData = await JSON.parse(localStorage);
		var arrayFromStorage = await storageData;

		// Grabing the id of the oldest task
		const oldestId = await arrayFromStorage[0].id;

		// clicking start button for every task
		const id = await arrayFromStorage[arrayFromStorage.length - 1].id;
		let startButton = await page.$(`#startButton${id}`);
		await startButton.click();

		// IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
		await page.waitForNavigation();

		startButton = await page.$(`#startButton${id}`);
		await startButton.click();

		// IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
		await page.waitForNavigation();

		// Visit Analytic Page
		await page.goto("https://cse110-fa22-group21.github.io/cse110-fa22-group21/analytics.html");

		// Grab task using the unique id of the oldest task
		const oldestTask = await page.$(`#task${oldestId}`);

		// Oldest task should be removed from the table after we add the new task
		expect(oldestTask).toBe(null);
	});

	// TODO TEAM 2 - LOG PAGE 2 GOES HERE, START AND END BUTTONS ALREADY CLICKED 100 TIMES
	it("TEAM 2 - LOG PAGE - After 100 task being complete, Check if the oldest one is removed from table", async () => {
		// Visit Log Page
		await page.goto("https://cse110-fa22-group21.github.io/cse110-fa22-group21/log.html");

		// Get the Item from local Storage
		let localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		let storageData = await JSON.parse(localStorage);
		var arrayFromStorage = await storageData;

		// Grabing the id of the oldest task
		const oldestId = await arrayFromStorage[0].id;
	
		// Grab task using the unique id of the oldest task
		const oldestTask = await page.$(`#task${oldestId}`);

		// Oldest task should be removed from the table after we add the new task
		expect(oldestTask).toBe(null);
	});
});
