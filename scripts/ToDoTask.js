import { openEditForm } from "./edit.js";

class ToDoTask extends HTMLElement {
    // Called once when document.createElement('task') is called, or
    // the element is written into the DOM directly as <task>
    constructor() {
        super(); // Inherit everything from HTMLElement

        // this.attachShadow({mode:"open"});
        // const tableRow = document.createElement("tr");

        // The css style is used only if shadow dom is used
        // it is kept in case shadow dom is needed in the future
        /*
        const style = document.createElement("style");
        style.innerText = `

        tr>td {
            padding: 1rem;
            text-align: center;
        }
        button{
            background-color: transparent;
            background-repeat: no-repeat;
            border: none;
            cursor: pointer;
            overflow: hidden;
            outline: none;
        }
        #editIcon {
            width: 30px;
        }
        `
        
        style.innerText = `
        tr {
            display: inherit;
        }`;
        */
        // this.shadowRoot.append(tableRow, style);
    }

    /**
    * Called when the .data property is set on this element.
    *
    * For Example:
    * let task = document.createElement('task'); // Calls constructor()
    * task.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
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
    *                          "notes": "string"
    *                        }f
    */
    set data(data) {
        // If nothing was passed in, return
        if (!data) return;

        // populate data in the table
        const tableRow = document.createElement("tr");

        // The information from data is added following the below format
        // const tableRow = this.shadowRoot.querySelector("tr");
        tableRow.innerHTML = `<td>${data.name}</td>
        <td>${data.hours} hr ${data.minutes} min</td>
        <td>${data.status}</td>
        <td><button class="editButton" id="editButton${data.id}">
        <img id="editIcon" src="admin/branding/edit-icon.svg" alt="Edit icon button for task ${data.id}"></button></td>`;

        document.body.querySelector('tbody').append(tableRow);
        document.getElementById(`editButton${data.id}`).onclick = openEditForm;
    }
}

customElements.define("to-do-task", ToDoTask);