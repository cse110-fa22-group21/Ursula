// --------------------------add popup window--------------------------------------

/* add functions to add button on-click */
document.getElementById("addButton").addEventListener("click", openForm);
document.getElementById("cancelButton").addEventListener("click", closeForm);

/*
 * Add button function
 * Once the use click on the add button, the popup form should pop up
 */
function openForm() {
    document.getElementById("popupForm").style.display = "block";
}
/*
 * Cancel button function
 * Once the use click on the button, the popup form should be closed
 */
function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}