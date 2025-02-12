// Accessing the DOM
// The document object can be accessed in the console using document.
// The tree starts from the top: html -> body -> p, etc.

// Problem: User interaction does not provide correct results.
// Solution: Improve interactivity for better task management.

// Selecting necessary elements
const taskInput = document.getElementById("new-task"); // Input field for new tasks
const addButton = document.querySelector("button"); // First button found in the DOM
const incompleteTaskHolder = document.getElementById("incompleteTasks"); // Unfinished tasks list
const completedTasksHolder = document.getElementById("completed-tasks"); // Completed tasks list

// Function to create a new task element
const createNewTaskElement = (taskString) => {
  const listItem = document.createElement("li");

  const checkBox = document.createElement("input"); // Checkbox for completion
  checkBox.type = "checkbox";

  const label = document.createElement("label");
  label.innerText = taskString;
  label.className = "task";

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "task";

  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "edit";

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete";
  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);
  return listItem;
};

// Function to add a new task
const addTask = () => {
  if (!taskInput.value.trim()) return;

  const listItem = createNewTaskElement(taskInput.value.trim());
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

// Function to edit an existing task
const editTask = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");

  const isEditing = listItem.classList.toggle("editMode");
  editBtn.innerText = isEditing ? "Save" : "Edit";

  if (isEditing) {
    editInput.value = label.innerText;
  } else {
    label.innerText = editInput.value.trim() || label.innerText;
  }
};

// Function to delete a task
const deleteTask = function () {
  this.parentNode.remove();
};

// Function to mark a task as completed
const taskCompleted = function () {
  completedTasksHolder.appendChild(this.parentNode);
  bindTaskEvents(this.parentNode, taskIncomplete);
};

// Function to mark a task as incomplete
const taskIncomplete = function () {
  incompleteTaskHolder.appendChild(this.parentNode);
  bindTaskEvents(this.parentNode, taskCompleted);
};

// Function to handle event binding
const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

// Adding event listeners
addButton.addEventListener("click", addTask);

// Bind existing tasks
[...incompleteTaskHolder.children].forEach((task) =>
  bindTaskEvents(task, taskCompleted)
);
[...completedTasksHolder.children].forEach((task) =>
  bindTaskEvents(task, taskIncomplete)
);
