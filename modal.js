$(document).ready(function(){
    const openDialogButton = document.getElementById("open-dialog");
const closeDialogButton = document.getElementById("close-dialog");
const myDialog = document.getElementById("my-dialog");

openDialogButton.addEventListener("click", () => {
    myDialog.showModal();
});

closeDialogButton.addEventListener("click", () => {
    myDialog.close();
});
});

