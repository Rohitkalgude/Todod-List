const taskInput = document.getElementById("task-input");
const addTask = document.getElementById("add-task");
const Filters = document.querySelectorAll(".filter");
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

clearCompleted.addEventListener("click", () => clearCompletedTodos());

function addTodo(text) {
  if (text.trim() === "") return;

  const todo = {
    id: Date.now(),
    text,
    completed: false,
  };

  todos.push(todo);
  savetodo();
  renderTodos();
  taskInput.value = "";
}

function savetodo() {
  localStorage.setItem("todos", JSON.stringify(todos));
  updateItemCount();
  checkEmptyState();
}

function updateItemCount() {
  const uncompletedTodos = todos.filter((todo) => !todo.completed);
  itemLeft.textContent = `${uncompletedTodos.length} item${
    uncompletedTodos.length !== 1 ? "s" : ""
  }`;
}

function checkEmptyState() {
  const visibleTodos = filterTodos(currentFilter);
  if (visibleTodos?.length == 0) emptyState.classList.remove("hidden");
  else emptyState.classList.add("hidden");
}

function filterTodos(filter) {
  switch (filter) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
}

function renderTodos() {
  todoList.innerHTML = "";
  const visibleTodos = filterTodos(currentFilter);

  visibleTodos.forEach((todo) => {
    const Todoitem = document.createElement("li");
    Todoitem.classList.add("todo-item");

    if (todo.completed) Todoitem.classList.add("completed");

    const checkboxContainer = document.createElement("label");
    checkboxContainer.classList.add("checkbox-container");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const checkmark = document.createElement("span");
    checkmark.classList.add("checkmark");

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(checkmark);

    const todoText = document.createElement("span");
    todoText.classList.add("todo-item-text");
    todoText.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    Todoitem.appendChild(checkboxContainer);
    Todoitem.appendChild(todoText);
    Todoitem.appendChild(deleteBtn);

    todoList.appendChild(Todoitem);
  });
}

function clearCompletedTodos() {
  todos = todos.filter((todo) => !todo.completed);
  savetodo();
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }

    return todo;
  });

  savetodo();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  savetodo();
  renderTodos();
}

function loadTodos() {
  const storeTodos = localStorage.getItem("todos");
  if (storeTodos) todos = JSON.parse(storeTodos);
  renderTodos();
  updateItemCount();
}

Filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    setActiveFilter(filter.getAttribute("data-filter"));
  });
});

function setActiveFilter(filter) {
  currentFilter = filter;

  Filters.forEach((item) => {
    if (item.getAttribute("data-filter") === filter) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  renderTodos();
}

function setDate() {
  const options = { weekday: "long", month: "short", day: "numeric" };
  const today = new Date();
  date.textContent = today.toLocaleDateString("en-US", options);
}

window.addEventListener("DOMContentLoaded", () => {
  loadTodos();
  updateItemCount();
  setDate();
  taskInput.focus();
});
