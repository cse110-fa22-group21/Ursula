// --------------------------edit popup window--------------------------------------

/* add functions to the edit button on-click */
document.getElementById("editButton").addEventListener("click", openEditForm);
document
  .getElementById("cancelEditButton")
  .addEventListener("click", closeEditForm);

/*
 * Open Edit button function
 * Once the use click on the add button, the edit popup form should pops up
 */
function openEditForm() {
  document.getElementById(`editForm`).style.display = "block";
}

/*
 * Cancel Edit button function
 * Once the use click on the button, the edit popup form should be closed
 */
function closeEditForm() {
  document.getElementById(`editForm`).style.display = "none";
}

export { openEditForm, closeEditForm };
