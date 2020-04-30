// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('#clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task-input');

// Load all event listeners
loadEventListeners();
console.log('loaded all event listeners');
function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', loadAllTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Delete task
  taskList.addEventListener('click', deleteTask);
  // Delete task
  clearBtn.addEventListener('click', clearTasks);
  // Filter task
  filter.addEventListener('input', filterTask);
}

// Create a new task element
function createTaskElement(taskName) {
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.innerHTML = `${taskName}<a href="#" class="delete-item secondary-content"><i class="fa fa-remove"></i></a>`;
  taskList.appendChild(li);
  console.log(`added '${taskName}' element`);
}

// Load all tasks from localStorage
function loadAllTasks(e) {
  let data = localStorage.getItem('tasks');
  if (data !== null) {
    data = JSON.parse(data);
    data.forEach(function (item, index) {
      createTaskElement(item);
    });
    console.log('loaded all tasks from localStorage');
  } else {
    console.log('no tasks in localStorage');
  }
}

// Add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
    console.log('no input');
  } else {
    // Create a new task element
    createTaskElement(taskInput.value);
    // Add to localStorage
    let data = localStorage.getItem('tasks');
    if (data === null) {
      data = [];
    } else {
      data = JSON.parse(data);
    }
    data.push(taskInput.value);
    localStorage.setItem('tasks', JSON.stringify(data));
    console.log(`added '${taskInput.value}' to localStorage`);
    // Clear input form
    taskInput.value = '';
  }
  e.preventDefault();
}

// Delete task
function deleteTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    // Get task element index
    let i = 0;
    let child = e.target.parentElement.parentElement;
    while ((child = child.previousSibling) !== null) {
      i++;
    }
    // Delete task element
    child = e.target.parentElement.parentElement;
    const taskName = String(child.firstChild.textContent);
    child.remove();
    console.log(`deleted '${taskName}' element`);
    // Delete from localStorage
    let data = JSON.parse(localStorage.getItem('tasks'));
    data.splice(i, 1);
    localStorage.setItem('tasks', JSON.stringify(data));
    console.log(`deleted '${taskName}' from localStorage`);
  }
}

// Clear all tasks
function clearTasks(e) {
  // Clear all task elements
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  console.log('cleared all task elements');
  // Clear all tasks from localStorage
  localStorage.removeItem('tasks');
  console.log('cleared all tasks from localStorage');
}

// Filter task
function filterTask(e) {
  const tasks = document.querySelectorAll('ul.collection li.collection-item'); // returns a NodeList
  tasks.forEach(function (item, index) {
    if (item.textContent.toLowerCase().includes(filter.value.toLowerCase())) {
      item.style.display = 'list-item';
    } else {
      item.style.display = 'none';
    }
  });
  console.log(`filtering '${filter.value}'`);
}
