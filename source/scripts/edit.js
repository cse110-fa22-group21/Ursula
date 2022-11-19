// --------------------------edit popup window--------------------------------------

/* add functions to the edit button on-click */
document.getElementById('editButton').addEventListener("click", () => {openEditForm(0)});
document.getElementById('cancelEditButton').addEventListener("click", closeEditForm);

/**
 * Open Edit button function
 * Once the user clicks on the add button, the edit popup form should pops up
 * The ID of the current task is also passed onto the deleteEditButton to reference the task upon deletion
 * @param {number} id ID of the task to be edited
 */
function openEditForm(id) {
    document.getElementById(`editForm`).style.display = "block";
    document.getElementsByClassName(`deleteEditButton`)[0].id = id;
}

/*
 * Cancel Edit button function
 * Once the use click on the button, the edit popup form should be closed
 */
function closeEditForm() {
  document.getElementById("editForm").style.display = "none";
}

export { openEditForm, closeEditForm };
