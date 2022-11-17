// Global Variables
var data = [];
// TODO: consider another array to store deleted tasks
// var deleted = [];

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

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
  const ref = document.querySelector("tbody");

  for (let i = 0; i < tasks.length; i++) {
    let ele = document.createElement("to-do-task");

    ele.data = tasks[i];
    ref.append(ele);
  }
}

/**
 * Reads 'to-do-tasks' from localStorage and returns an array of
 * all of the tasks found. If nothing is found in localStorage for
 * 'to-do-tasks', an empty array is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

/**
 * Takes in an array of to-do-task, converts it to a string, and then
 * saves that string to 'to-do-task' in localStorage
 * @param {Array<Object>} tasks An array of recipes
 */
function saveTaskToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/** STORE DATA FROM TASK POPUP */

function initFormHandler() {
  // Get data from task popup form
  const form = document.querySelector("form");

  form.addEventListener("submit", () => {
    let formData = new FormData(form);
    let taskData = new Object();
    for (const key of formData.keys()) {
      taskData[key] = formData.get(key);
    }
    // define task status
    taskData.status = "Planned";

    taskData.id = generateUniqueID();

    const task = document.createElement("to-do-task");
    task.data = taskData;
    task.style.cssText = "display: inherit";

    document.querySelector("tbody").append(task);

    // save data to global variable
    data.push(taskData);

    let tasks = getTasksFromStorage();
    tasks.push(taskData);
    saveTaskToStorage(tasks);
  })
}