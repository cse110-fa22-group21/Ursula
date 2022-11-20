import { getTasksFromStorage, saveTaskToStorage } from "./add.js";
// --------------------------edit popup window--------------------------------------

/* add functions to the edit button on-click */
// document.getElementById("editButton").addEventListener("click", () => {openEditForm(0);});
document.getElementById("cancelEditButton").addEventListener("click", closeEditForm);

/**
 * Open Edit button function
 * Once the user clicks on the add button, the edit popup form should pops up
 * The ID of the current task is also passed onto the deleteEditButton to reference the task upon deletion
 * as well as upon saving new data
 * @param {number} id ID of the task to be edited
 */
function openEditForm(id) {
    document.getElementById("editForm").style.display = "block";
    document.getElementsByClassName("deleteEditButton")[0].id = id;
    document.getElementsByClassName("submitEditButton")[0].id = id;
}

/*
 * Cancel Edit button function
 * Once the use click on the button, the edit popup form should be closed
 */
function closeEditForm() {
  document.getElementById("editForm").style.display = "none";
}

// -------------------------- end of edit popup window--------------------------------------

// --------------------------edit button and extracting data --------------------------------------
//when the save button in the edit form is clicked, call saveData given the ID of the particular task name
document.getElementsByClassName("submitEditButton")[0].addEventListener("click", () => {
  saveData(document.getElementsByClassName("submitEditButton")[0].id);
});

/**
 * Open Edit Button and get Data Function.
 * Once the user clicks on the edit button, the edit popup form should pop up and populate the data
 * The ID of the current task is also passed to find the data in local storage
 * @param {number} id ID of the task to be edited
 */
function getData(id) {
  //obtain tasks from storage
  const taskList = getTasksFromStorage();
  //iterate until we find the ID
  for (var i = 0; i < taskList.length; i++) {
    //if ID matches, extract that data and populate the edit form input fields
    if (taskList[i].id == id) {
      document.getElementById("taskNameFieldEdit").value = taskList[i].name;
      document.getElementById("hourFieldEdit").value = taskList[i].hours;
      document.getElementById("minFieldEdit").value = taskList[i].minutes;
      document.getElementById("typeTaskFieldEdit").value = taskList[i].type;
      document.getElementById("statusField").value = taskList[i].status;
      document.getElementById("noteFieldEdit").value = taskList[i].notes;
    }
  }
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
  //Extract data from the input fields and populate it to the json file
  for (var i = 0; i < taskList.length; i++) {
    //if ID matches, extract that data and populate edit form input field
    if (taskList[i].id == id) {
      //once id matches, set the data to be the input field value
      taskList[i].name = document.getElementById("taskNameFieldEdit").value;
      taskList[i].hours = document.getElementById("hourFieldEdit").value;
      taskList[i].minutes = document.getElementById("minFieldEdit").value;
      taskList[i].type = document.getElementById("typeTaskFieldEdit").value;
      taskList[i].status = document.getElementById("statusField").value;
      taskList[i].notes = document.getElementById("noteFieldEdit").value;
    }
  }
  //save all other tasks back to storage
  saveTaskToStorage(taskList);
  //reload the page with the new contents
  location.reload();
}

export { openEditForm, closeEditForm, getData };