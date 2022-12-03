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
	it("Initial Home Page - Check for 0 task names", async () => {
		const storage = await page.evaluate(() => {
			return window.localStorage.getItem("tasks");
		});
		expected = null;
		expect(storage).toBe(expected);
	});

	// Add Team Testing
	it("Add Team - Testing add Button", async () => {
		// Grab the add button to click
		const addButton = await page.$("#addButton");
		await addButton.click();

		// Create a task to test against localStorage data
		// let tasks = [{
		//   "name": "Task 1",
		//   "hours": "10",
		//   "minutes": "50",
		//   "type": "CSE 110",
		//   "notes": "My name is kaiserschmarren"
		// }]
		// const task = tasks[0];

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

	// Edit Team Testing
	// Test #1 Checking that edit form brings up correct data when edit button is clicked
	it("Edit Team - Click edit button then check if form is populated correctly", async () => {
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

	// Test #2 Edit data in the form, click submit then check if localstorage storage is correct
	// and check if data in table is correct
	it("Edit data in the form, click submit then check if localstorage is correct and table is correct", async () => {
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

	// Test #3 Edit data in the form, click cancel and check data in local storage did not change,
	// check if data in table did not change
	it("Edit data in the form, click cancel then check if local storage and data in table did not change", async () => {
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

		// IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
		// This line is not needed as cancel does not reload the page
		// await page.waitForNavigation();

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

	// Team 1 Begin testing homepage here
	// Test 1 - Click finish button, check that data.finished, data.status has correct values
	it("Click Start Button, check JSON fields are correct", async () => {
		// Get the Item from local Storage
		let localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		const storageData = JSON.parse(localStorage);
		var arrayFromStorage = await storageData;

		// Check that the value of .started is false, start is undefined, status is Planned
		expect(arrayFromStorage[0].started).toBe(false);
		expect(arrayFromStorage[0].start).toBe(undefined);
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

	// Test 2 - Click start button, check that data.start, data.started, data.status has correct values
	it("Click End Button, check JSON fields are correct", async () => {
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

	// Test 3 - Populate data with
	it("Click End Button, check JSON fields are correct", async () => {
		let localStorage = await page.evaluate(() => localStorage.getItem("tasks"));
		// Create 99 Tasks and store into tasks array to add 100 tasks into localStorage
		for (let i = 0; i < 98; i++) {
			tasks.push(task);
		}

		// Add tasks to local storage
		await page.evaluate(() => {
			let addedTasks = [
				{
					name: "Task 1",
					hours: "10",
					minutes: "50",
					type: "CSE 110",
					notes: "My name is kaiserschmarren",
					finished: "false",
				},
			];

			// Add 99 items to local storage
			for (let i = 0; i < 99; i++) {
				addedTasks.push(addedTasks[0]);
			}
			window.localStorage.setItem("tasks", JSON.stringify(addedTasks));
		});

		localStorage = await page.evaluate(() => window.localStorage.getItem("tasks"));

		// Grab the add button to click
		const addButton = await page.$("#addButton");
		await addButton.click();

		// ADD 100TH TASK manually
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

		localStorage = await page.evaluate(() => window.localStorage.getItem("tasks"));
		console.log("100 tasks? ", JSON.parse(localStorage).length);

		// TODO We are able to populate data into local storage but the website cannot detect 100 tasks on the page.
		// console.log(localStorage);
		// console.log(JSON.parse(localStorage).length);

		// await page.reload();
		// // IMPORTANT THE PAGE RELOADS AND SO NAVIGATION BREAKS
		// await page.waitForNavigation();
	});

	//-------------------------------------------------------------------------------------------------------------------------DELETE TEAM
	// Clear local storage, add a task, remove it, and check if the local storage is empty
	it("Edit data in the form, click submit then check if localstorage is correct and table is correct", async () => {
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
});
