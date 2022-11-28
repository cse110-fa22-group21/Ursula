
// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the task program, all function calls trace back here
function init() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  // Add each task to the <tbody> element
  addTaskToDocument(tasks);
  // Add the event listeners to the form elements
  
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
        if(tasks[i].difference > 0) addTask(tasks[i]);
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

    let minbuf = (data.difference < 60) ? 1 : Math.round((data.difference/60)%60);
    let hrbuf = Math.round((data.difference/60)/60);

    let predictedDiff = data.minutes*60 + data.hours*60*60; 
    //predictedDiff = 60;

    let reaction = "happy"; 
    if ((predictedDiff+(5*60)-data.difference) < 0) reaction = "sad";
    else if ((predictedDiff/data.difference) > 1.5) reaction = "confused"; 

    // The information from data is added following the below format
    tableRow.innerHTML = `<td>${data.name}</td>
    <td>${data.hours} hr ${data.minutes} min</td>
    <td>${hrbuf} hr ${minbuf} min</td>
    <td>
    <img id="reactEmoji" src="/source/images/${reaction}.png" alt="Reaction emoji for task ${data.id}">
    </td>`;
    tableRow.id = `task${data.id}`;
    tableRow.className = "task";
    document.body.querySelector("tbody").append(tableRow);

    // Styling for emoji
    const style = document.createElement("style");
    style.innerText = `
    #reactEmoji {
        height: 35px;
      }`;
    
    document.body.querySelector("tbody").append(style);
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
}