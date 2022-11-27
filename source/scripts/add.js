// Import functions from edit.js
import { openEditForm } from "./edit.js";
import { deleteTaskById } from "./delete.js"

// Global Variables
/**
 * @type {Array}
 */
var data = [];
// TODO: consider another array to store deleted tasks
// var deleted = [];

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the task program, all function calls trace back here
function init() {
  let tasks = getTasksFromStorage();
  // Add each task to the <tbody> element
  addTaskToDocument(tasks);
  // Add the event listeners to the form elements
  initFormHandler();
}

// -------------------------- ADD TASK POPUP --------------------------------------

// Add functions to add button on-click
document.getElementById("addButton").addEventListener("click", openForm);
document.getElementById("cancelButton").addEventListener("click", closeForm);

/*
 * Add button function
 * Once the user clicks on the add button, the popup form should pop up
 */
function openForm() {
  document.getElementById("popupForm").style.display = "block";
}

/*
 * Cancel button function
 * Once the user clicks on the button, the popup form should be closed
 */
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

// -------------------------- ADD DATA STORAGE --------------------------------------
/**
 * Generates a unique ID using crypto.randomUUID.
 * https://stackoverflow.com/questions/1155008/how-unique-is-uuid
 * @returns {string} A unique string ID to represent each task.
 */
function generateUniqueID() {
  return crypto.randomUUID();
}

/**
 * Takes in an array of tasks and for each task creates a
 * new <to-do-task> element, adds the task data to that item
 * using element.data = {...}, and then appends that new task
 * to <tbody>
 * @param {Array<Object>} tasks An array of recipes
 */
function addTaskToDocument(tasks) {
  for (let i = 0; i < tasks.length; i++) {
    addTask(tasks[i]);
  }
}

/**
 * Populate the table using the data object.
 *
 * @param {Object} data - The data to pass into the <task>, must be of the
 *                        following format:
 *                        {
 *                          "id": "number",
 *                          "name": "string",
 *                          "hours": "number",
 *                          "minutes": "number",
 *                          "type": "string",
 *                          "status": "string",
 *                          "notes": "string",
 *                          "start": "object",
 *                          "end": "object",
 *                          "difference": "number",
 *                          "started" : "boolean"
 *                        }
 */
function addTask(data) {
  // populate data in the table
  const tableRow = document.createElement("tr");

  // The information from data is added following the below format
  tableRow.innerHTML = `<td>${data.name}</td>
  <td>${data.hours} hr ${data.minutes} min</td>
  <td>${data.status}</td>
  <td>
  <button class="startButton" id="startButton${data.id}">Start</button>
  <button class="editButton" id="editButton${data.id}">
  <img id="editIcon" src="/source/images/edit-icon.svg" alt="Edit icon button for task ${data.id}">
  </button>
  </td>`;
  tableRow.id = `task${data.id}`;
  tableRow.className = "task";

  document.body.querySelector("tbody").append(tableRow);

  // On Click Task Name, Show the Task Notes
  // Create another task row tag and put the notes into it
  const tableRowNotes = document.createElement("tr");
  tableRowNotes.innerHTML = `<td COLSPAN="4">${data.notes}</td>`;
  // Each note will have its own ID
  tableRowNotes.className = "notes";
  tableRowNotes.id = `notes${data.id}`;
  // tableRow.append(tableRowNotes);
  document.body.querySelector("tbody").append(tableRowNotes);

  // Display notes when clicked, hide when clicked again
  tableRow.addEventListener("click", () => {
    document.getElementById(`notes${data.id}`).style.display = (document.getElementById(`notes${data.id}`).style.display == "none") ? "table-row" : "none";
    //document.getElementById(`task${data.id}`).childNodes.forEach(x => {if(x.localName == "td") x.style.backgroundColor = (document.getElementById(`notes${data.id}`).style.display=="none") ? "none" : "#e8e0e2"});
  });

  // Checks each data.started and chagnes the innerText of the startButton to Finish or Start
  // Set the button inner to End
  if (data.started) {
    document.getElementById(`startButton${data.id}`).innerText = "Finish";
  }

  // Else set button inner to Start
 else {
    document.getElementById(`startButton${data.id}`).innerText = "Start";
  }

  // When startButton is clicked, check to see if started or not
  document.getElementById(`startButton${data.id}`).addEventListener("click", () => {
    // If started is true 
    if (data.started) {
      // Call endSwitch
      endSwitch(data.id);
      // TODO Team2: Add to Log here, pass in ID
    }
    // If started is false
    else {
      // Call startSwitch to set the data accordingly
      startSwitch(data.id);
    }
  });


  // When editbutton is clicked, it will call openEditForm to open the form with the populated data
  document.getElementById(`editButton${data.id}`).addEventListener("click", () => {
    openEditForm(data.id);
  });
}

/**
 * Find the task in local storage, set its started to be true, status to be In-Progress
 * and record the start time in start. Once we set the new data, save it to storage and reload the page.
 * @param {number} id ID of the start button.
 */
// Change the ID and Classname of the start button to be endButton
function startSwitch(id) {
  // Obtain tasks from storage
  const taskList = getTasksFromStorage();
  // Iterate until we find the ID
  for (var i = 0; i < taskList.length; i++) {
    // If ID matches, set to be new status
    if (taskList[i].id == id) {
      taskList[i].started = true;
      taskList[i].status = "In-Progress";
      taskList[i].start = new Date();
      console.log(taskList[i].start);
    }
  }
  saveTaskToStorage(taskList);
  location.reload();
}

/**
 * Find the task in local storage, set its started to be true, status to be In-Progress
 * and record the start time in start. Once we set the new data, save it to storage and reload the page.
 * @param {number} id ID of the start button.
 */
// Change the ID and Classname of the start button to be endButton
function endSwitch(id) {
  // Obtain tasks from storage
  const taskList = getTasksFromStorage();
  // Iterate until we find the ID
  for (var i = 0; i < taskList.length; i++) {
    // If ID matches, set to be new status
    if (taskList[i].id == id) {
      taskList[i].end = new Date();
      // console.log(taskList[i].end);
      // taskList[i].difference = taskList[i].end - taskList[i].start;
      // console.log((taskList[i].end.getTime() - taskList[i].start.getTime())/1000);
      deleteTaskById(id);
    }
  }
}

/**
 * Reads 'tasks' from localStorage and returns an array of
 * all of the tasks found. If nothing is found in localStorage for
 * 'tasks', an empty array is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

/**
 * Takes in an array of tasks, converts it to a string, and then
 * saves that string to 'tasks' in localStorage
 * @param {Array<Object>} tasks An array of recipes
 */
function saveTaskToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/** STORE DATA FROM TASK POPUP
 * Initializes the handler function when the task form is submitted.
 *
 * Task data is populated from each input in the form, generated with a unique ID, and
 * assigned the initial status. The new task is then added into local storage.
 */
function initFormHandler() {
  // Get data from task popup form
  const form = document.querySelector("form");

  form.addEventListener("submit", () => {
    let formData = new FormData(form);
    let taskData = new Object();
    for (const key of formData.keys()) {
      taskData[key] = formData.get(key);
    }

    // Initially set status to be planned and started to be false, generate unique ID for the task
    taskData.status = "Planned";
    taskData.started = false;
    taskData.id = generateUniqueID();

    // populate the table
    addTask(taskData);

    // save data to global variable
    data.push(taskData);

    let tasks = getTasksFromStorage();
    tasks.push(taskData);
    saveTaskToStorage(tasks);
  });
}

export { getTasksFromStorage, saveTaskToStorage, startSwitch };