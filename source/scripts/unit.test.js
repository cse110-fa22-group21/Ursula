// Run npm test unit.test.js

/** TEST LOCAL STORAGE */
// Import functions from add.js and delete.js
const functions = require('/source/scripts/add.js');

test('Add one task to local storage', ()=>{
    // create task
    const task = [{
        "id": "24132",
        "name": "Test task is added",
        "hours": 4,
        "minutes": 20,
        "type": "",
        "status": "In-Progress",
        "notes": "Sample test."
    }];

    // validate task in local storage
    functions.saveTaskToStorage(task);
    expect(JSON.parse(localStorage.getItem("tasks"))).toBe(task);
})

