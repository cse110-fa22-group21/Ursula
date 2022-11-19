import { getTasksFromStorage, saveTaskToStorage } from "./add.js";

document.getElementsByClassName("deleteEditButton")[0].addEventListener("click", () => {deleteTaskById(document.getElementsByClassName("deleteEditButton")[0].id)});

/**
 * Reads 'to-do-tasks' from localStorage, removes the task with the given ID
 * And then rewrites the updated list of Tasks back to local storage.
 * @param {number} id ID of the task to be removed from local storage
 */
export function deleteTaskById(id){

    const taskList = getTasksFromStorage();
    
    //const del = document.getElementById('id');

    for(var i = 0; i < taskList.length; i++) {
        /**if(taskList[i] == del) {
            taskList.splice(i, 1);
        }**/

        if(taskList[i].id == id){
            taskList.splice(i, 1);
        }
    }

    saveTaskToStorage(taskList);

    location.reload();
}