import { getTasksFromStorage, saveTaskToStorage } from "./add.js";

document.getElementsByClassName("deleteEditButton")[0].addEventListener("click", () => {deleteTaskById(document.getElementsByClassName("deleteEditButton")[0].id)});

/**
 * Reads 'to-do-tasks' from localStorage, removes the task with the given ID
 * And then rewrites the updated list of Tasks back to local storage.
 * Then, it reloads the page to refresh the task list
 * @param {number} id ID of the task to be removed from local storage
 */
export function deleteTaskById(id){
    //obtain tasks from storage
    const taskList = getTasksFromStorage();
    //iterate until we find the ID
    for(var i = 0; i < taskList.length; i++) {
        //delete the ID
        if(taskList[i].id == id){
            taskList.splice(i, 1);
        }
    }
    //save all other tasks back to storage
    saveTaskToStorage(taskList);
    //reload the page with the new contents
    location.reload();
}