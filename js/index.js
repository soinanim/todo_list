let listOfTasks = [];
const list = document.querySelector('#tasks-list');
const form = document.getElementById('form__new-task');
const deleteTaskButtons = document.getElementsByClassName('delete');

function renderTask(task) {
  localStorage.setItem('list', JSON.stringify(listOfTasks));

  const item = document.querySelector(`[data-key='${task.id}']`);

  if (task.deleted) {
    item.remove();
    if (listOfTasks.length === 0) list.innerHTML = '';
    return;
  }

  const isChecked = task.checked ? 'done' : '';
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  const text = document.createTextNode(task.text);
  const span = document.createElement('span');
  const button = document.createElement('button');

  li.setAttribute('class', `task ${isChecked}`);
  li.setAttribute('data-key', task.id);

  checkbox.setAttribute('id', `${task.id}`);
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('class', 'checkbox-task');
  checkbox.checked = task.checked;

  button.setAttribute('class', 'delete-task');

  span.appendChild(text);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(button);

  if (item) {
    list.replaceChild(li, item);
  } else {
    list.append(li);
  }
}

list.addEventListener(
  'click',
  (event) => {
    const key = event.target.parentElement.dataset.key;

    if (event.target.classList.contains('delete-task')) {
      deleteTask(key);
    }

    if (event.target.tagName === 'SPAN') {
      toggleDone(key);
      ``;
    }

    if (event.target.classList.contains('checkbox-task')) {
      toggleDone(key);
    }
  },
  false
);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const input = document.getElementById('input__new-task');
  const text = input.value.trim();

  if (text !== '') {
    addTask(text);
    input.value = '';
    input.focus();
  }
});

function addTask(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  listOfTasks.push(todo);
  renderTask(todo);
}

function toggleDone(key) {
  const index = listOfTasks.findIndex((task) => task.id === Number(key));

  if (listOfTasks[index]) {
    listOfTasks[index].checked = !listOfTasks[index]?.checked;
  }

  renderTask(listOfTasks[index]);

  if (listOfTasks[index].checked) {
    let audio = document.querySelector('.audio');
    audio.play();
  }
}

function deleteTask(key) {
  const index = listOfTasks.findIndex((task) => task.id === Number(key));

  const todo = {
    deleted: true,
    ...listOfTasks[index],
  };

  listOfTasks = listOfTasks.filter((task) => task.id !== Number(key));
  renderTask(todo);
}

document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('list');

  if (ref) {
    listOfTasks = JSON.parse(ref);
    listOfTasks.forEach((t) => {
      renderTask(t);
    });
  }
});
