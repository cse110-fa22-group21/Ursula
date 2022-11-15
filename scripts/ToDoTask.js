class ToDoTask extends HTMLElement {
    // Called once when document.createElement('task') is called, or
    // the element is written into the DOM directly as <task>
    constructor() {
        super(); // Inherit everything from HTMLElement
        const tableRow = document.createElement("tr");
        /*
        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(tableRow);
        */
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
    *                        }
    */
    set data(data) {
        // If nothing was passed in, return
        if (!data) return;

        // const tableRow = this.shadowRoot.querySelector("tr");
        const tableRow = document.getElementsByTagName("tr")[1];
        tableRow.innerHTML = `<td>${data.name}</td>
        <td>${data.hours} hr ${data.minutes} min</td>
        <td>${data.status}</td>
        <td><button id="editButton${data.id}"><img id="editIcon" src="admin/branding/edit-icon.svg" alt="Edit icon button for task ${data.id}"></button></td>`;
    }
}

customElements.define("to-do-task", ToDoTask);