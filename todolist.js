const taskInput = document.getElementById("task-input");
const addTask = document.getElementById("add-task");
const Filter = document.querySelectorAll(".filter");
const todoList = document.getElementById("todo-list");
const itemLeft = document.getElementById("item-left");
const emptyState = document.querySelector(".empty-state");
const date = document.getElementById("date");
const clearCompleted = document.getElementById("clear-completed");

let todos = [];
let currentFilter = "all";

addTask.addEventListener("click", () => {
  addTodo(taskInput.value);
});

taskInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter") addTodo(taskInput.value);
});

clearCompleted.addEventListener("click", () => clearCompleted);

function addTodo(text) {
  if (text.trim() === "") return;

  const todo = {
    id: Date.now(),
    text,
    completed: false,
  };

  todos.push(todo);
  savetodo();
}

function savetodo() {
  localStorage.setItem("todos", JSON.stringify(todos));
  updateItemCount();
  checkImptyState();
}

function updateItemCount() {
  const uncompletedTodos = todos.filter((todo) => !todo.completed);
  itemLeft.textContent = `${uncompletedTodos.length} item${
    uncompletedTodos.length !== 1 ? "s" : ""
  }`;
}

function checkImptyState() {
  const filteredTodos = filteredTodos(currentFilter);
  if (filteredTodos.length == 0) emptyState.classList.remove("hidden");
  else emptyState.classList.add("hidden");
}

function filteredTodos(filter) {
  switch (filter) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    default:
      todos;
  }
}

function randerTodos() {
  todoList.innerHTML = "";
  const filteredTodos = filteredTodos(currentFilter);

  filteredTodos.forEach((todo) => {
    const Todoitem = document.createElement("li");
    Todoitem.classList.add("todo-item");

    if (todo.completed) Todoitem.classList.add("completed");

    const checkboxContainer = document.createElement("label");
    checkboxContainer.classList.add("checkbox-container");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");
    checkbox.checked = todo.completed;

    const checkmark = document.createElement("span");
    checkmark.classList.add("checkmark");

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(checkmark);
  });
}

function clearCompleted() {}
