// Show selected section

function showSection(sectionId) {

    const sections = document.querySelectorAll(".section");

    sections.forEach(function(section) {
        section.classList.add("hidden");
    });

    document.getElementById(sectionId).classList.remove("hidden");
}


// Open task form

function openTaskForm() {

    document.getElementById("taskForm")
        .classList.remove("hidden");
}


// Close task form

function closeTaskForm() {

    document.getElementById("taskForm")
        .classList.add("hidden");
}


// Add Task

function addTask() {

    const taskName =
        document.getElementById("taskName").value;

    const taskDescription =
        document.getElementById("taskDescription").value;

    const taskMember =
        document.getElementById("taskMember").value;

    const taskPriority =
        document.getElementById("taskPriority").value;

    const taskDeadline =
        document.getElementById("taskDeadline").value;

    const taskStatus =
        document.getElementById("taskStatus").value;


    // Basic validation

    if (
        taskName === "" ||
        taskMember === "" ||
        taskPriority === "" ||
        taskDeadline === ""
    ) {

        alert("Please fill all required fields.");

        return;
    }


    // Display message for now

    alert("Task created successfully!");

    closeTaskForm();
}