// Global Variables
var data = [];
var items = 0;
// TODO: consider another array to store deleted tasks

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the task program, all function calls trace back here
function init() {
  let tasks = getTasksFromStorage();
  // Add each recipe to the <main> element
  addTaskToDocument(tasks);
  // Add the event listeners to the form elements
  initFormHandler();
}


// -------------------------- ADD TASK POPUP --------------------------------------

/* Add functions to add button on-click */
document.getElementById("addButton").addEventListener("click", openForm);
document.getElementById("cancelButton").addEventListener("click", closeForm);

/*
 * Add button function
 * Once the use click on the add button, the popup form should pop up
 */
function openForm() {
    document.getElementById("popupForm").style.display = "block";
}
/*
 * Cancel button function
 * Once the use click on the button, the popup form should be closed
 */
function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}


// -------------------------- ADD DATA STORAGE --------------------------------------
/**
 * Takes in an array of tasks and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} tasks An array of recipes
 */
 function addTaskToDocument(tasks) {
    // A10. TODO - Get a reference to the <main> element
    const ref = document.querySelector("tbody");
    // A11. TODO - Loop through each of the recipes in the passed in array,
    //            create a <recipe-card> element for each one, and populate
    //            each <recipe-card> with that recipe data using element.data = ...
    //            Append each element to <main>

    for (let i = 0; i < tasks.length; i++)
    {
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
    // EXPLORE - START (All explore numbers start with B)
    // B1. TODO - Complete the functionality as described in this function
    //            header. It is possible in only a single line, but should
    //            be no more than a few lines.
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
/** STORE DATA FROM TASK POPUP */

 function initFormHandler() {
    // Get data from task popup form
    const form = document.querySelector("form");
    
    form.addEventListener("submit", (event)=>{
      let formData = new FormData(form);
      let taskData = new Object();
      for (const key of formData.keys()){
        taskData[key] = formData.get(key);
      }
      // define task status
      taskData.status = "In Progress";
      taskData.id = ++items; 
      //console.log(items);
      //console.log('test', taskData);
      const task = document.createElement("to-do-task");
      task.data = taskData;

      document.querySelector("tbody").append(task);
      //document.getElementsByTagName("main")[0].append(tbody);
      
      // save data to global variable
      data.push(taskData);

      let tasks = getTasksFromStorage();
      tasks.push(taskData);
      saveTaskToStorage(tasks);
      //console.log('tasks', tasks)
    })
}