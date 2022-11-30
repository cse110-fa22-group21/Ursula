// Import functions from add.js and delete.js
import { getTasksFromStorage, saveTaskToStorage } from "./add.js";
import { deleteTaskById } from "./delete.js";
// --------------------------edit popup window--------------------------------------

/* add functions to the edit button on-click */
// document.getElementById("editButton").addEventListener("click", () => {openEditForm(0);});

/**
 * Open Edit button function
 * Once the user clicks on the add button, the edit popup form should pop up.
 * Since we are given the id, the data is extracted from local storage using the id
 * and the input fields are populated. Opening the edit form will allow us access to 3 buttons
 * a save button which has been given an event listener to call the saveData function to save the
 * newly updated data back into local storage. A cancel button that has been given an add event listerner
 * to hide the edit popup form. A delete button that removes the task from local storage and does not
 * display it anymore on the home page.
 * The ID of the current task is also passed onto the deleteEditButton to reference the task upon deletion
 * as well as upon saving new data
 * @param {number} id ID of the task to be edited
 */
function openEditForm(id) {
    document.getElementById("editForm").style.display = "block";
    // Obtain tasks from storage
    const taskList = getTasksFromStorage();
    // Iterate until we find the ID
    for (var i = 0; i < taskList.length; i++) {
      // If ID matches, extract that data and populate the edit form input fields
      // Also customises the edit title to be "Editing Specific Task Name"
      if (taskList[i].id == id) {
        document.getElementById("editTask").innerText = "Editing " + taskList[i].name;
        document.getElementById("taskNameFieldEdit").value = taskList[i].name;
        document.getElementById("hourFieldEdit").value = taskList[i].hours;
        document.getElementById("minFieldEdit").value = taskList[i].minutes;
        document.getElementById("typeTaskFieldEdit").value = taskList[i].type;
        document.getElementById("noteFieldEdit").value = taskList[i].notes;
      }
    }

    // When resetButton is clicked, call resetData, written in edit.js
    document.getElementById("resetButton").addEventListener("click", () => {
      resetData(id);
    });


    // When deletEditButton is clicked, call deleteTaskById, written in delete.js
    document.getElementsByClassName("deleteEditButton")[0].addEventListener("click", () => {
      deleteTaskById(id);
    });

    // When submitEditButton is clicked, call saveData, written in edit.js
    document.getElementsByClassName("submitEditButton")[0].addEventListener("click", () => {
      saveData(id);
    });

    // When cancelEditButton is clicked, call closeEditForm, written in edit.js
    document.getElementById("cancelEditButton").addEventListener("click", () => {
      closeEditForm();
    });
}

/*
 * Close Edit button function
 * Once the use click on the button, the edit popup form should be closed
 */
function closeEditForm() {
  document.getElementById("editForm").style.display = "none";
}

/*
 * Cancel Edit button function
 * Once the use click on the button, the edit popup form should be closed
 */
function resetData(id) {
  const taskList = getTasksFromStorage();
  for (var i = 0; i < taskList.length; i++) {
    // If ID matches, extract that data and populate edit form input field
    if (taskList[i].id == id) {
      taskList[i].start = "";
      taskList[i].status = "Planned";
      taskList[i].started = false;
    }
  }
  saveTaskToStorage(taskList);
  location.reload();
}

/**
 * Open Edit Button to save data.
 * Once the user clicks on edit save button, The ID of the current task is also passed to 
 * find the data in local storage. Once the task is found based on the id,
 * it sets the data of the local storage to be the new data given in the form. 
 * Save the new data to storage and then reload the page.
 * @param {number} id ID of the task to be edited
 */
function saveData(id) {
  const taskList = getTasksFromStorage();
  // Extract data from the input fields and populate it to the json file
  for (var i = 0; i < taskList.length; i++) {
    // If ID matches, extract that data and populate edit form input field
    if (taskList[i].id == id) {
      // Once id matches, set the data to be the input field value
      taskList[i].name = document.getElementById("taskNameFieldEdit").value;
      taskList[i].hours = document.getElementById("hourFieldEdit").value;
      taskList[i].minutes = document.getElementById("minFieldEdit").value;
      taskList[i].type = document.getElementById("typeTaskFieldEdit").value;
      taskList[i].notes = document.getElementById("noteFieldEdit").value;
    }
  }
  // Save all other tasks back to storage
  saveTaskToStorage(taskList);
  // Reload the page with the new contents
  location.reload();
}

export { openEditForm, closeEditForm };