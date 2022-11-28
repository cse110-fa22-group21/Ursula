// Run the init() function when the page has loaded

// Global Variables
/**
 * @type {Array}
 */
 var count = 0;
 var maxFull = false;

window.addEventListener("DOMContentLoaded", init);

// Starts the task program, all function calls trace back here
function init() {
  let taskList = getTasksFromStorage();
  for(let i=0; i<taskList.length; i++){
    console.log(taskList[i].name);
    if(taskList[i].status =="Completed"){
      addLog(taskList[i]);
      if(count < 99){  //max value of stack : 99
        count++;
      }else{
        maxFull = true;
      }
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
function addLog(data) {
    // if there are not 100 tasks yet, display on the page
    if(!maxFull){
        // populate data in the table
        const tableRow = document.createElement("tr");
        // The information from data is added following the below format
        tableRow.innerHTML = 
        `<td>${data.name}</td>
        <td>${data.type}</td>
        <td>${data.end}</td>
        </td>`;
        document.body.querySelector("tbody").append(tableRow);
    }
    // if there are more than 100 tasks, delete the first old tasks
    else{
        const tableRow = document.createElement("tr");
        // The information from data is added following the below format
        tableRow.innerHTML = 
        `<td>${data.name}</td>
        <td>${data.type}</td>
        <td>${data.end}</td>
        </td>`;
        document.body.querySelector("tbody").append(tableRow);
        // delete old tasks
        document.body.querySelector("tbody").querySelector("tr").remove();
    }
}
