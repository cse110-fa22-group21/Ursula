// Import functions from add.js
import { getTasksFromStorage, saveTaskToStorage } from './add.js'

/**
 * Reads 'to-do-tasks' from localStorage, removes the task with the given ID
 * And then rewrites the updated list of Tasks back to local storage.
 * Then, it reloads the page to refresh the task list
 * @param {number} id ID of the task to be removed from local storage
 */
function deleteTaskById(id) {
    // Obtain tasks from storage
    const taskList = getTasksFromStorage()
    // iterate until we find the ID
    for (var i = 0; i < taskList.length; i++) {
        // delete the ID and decrement currentTasks
        if (taskList[i].id == id) {
            taskList.splice(i, 1)
        }
    }
    // Save all other tasks back to storage
    saveTaskToStorage(taskList)
    // Reload the page with the new contents
    location.reload()
}

export { deleteTaskById }
