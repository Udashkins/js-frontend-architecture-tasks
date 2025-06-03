import uniqueId from 'lodash/uniqueId.js';

// BEGIN
export default function () {
  const newListForm = document.querySelector('[data-container="new-list-form"]');
  const listsContainer = document.querySelector('[data-container="lists"]');
  const newTaskForm = document.querySelector('[data-container="new-task-form"]');
  const tasksContainer = document.querySelector('[data-container="tasks"]');

  let lists = [{ id: uniqueId(), name: 'General' }];
  let tasks = {}; 

  renderLists();
  newListForm.addEventListener('submit', addList);
  newTaskForm.addEventListener('submit', addTask);

  function renderLists() {
    listsContainer.innerHTML = ''; 

    const ul = document.createElement('ul');
    lists.forEach(list => {
      const li = document.createElement('li');
      li.textContent = list.name;
      ul.appendChild(li);
    });
    listsContainer.appendChild(ul);
  }

const renderTasks = () => {
        tasksContainer.innerHTML = '';
        const ul = document.createElement('ul');
        const activeList = state.lists[state.activeListId];
        if (activeList && activeList.taskIds) {
            activeList.taskIds.forEach((taskId) => {
                const task = state.tasks[taskId];
                if (task) {
                    const li = document.createElement('li');
                    li.textContent = task.title;
                    ul.appendChild(li);
                }
            });
            if (ul.children.length > 0)
                {tasksContainer.appendChild(ul);}
        }
    };
  
  function getActiveList() {
    const ActiveListElement = listsContainer.querySelector('li:first-child');
    if (!ActiveListElement) {
        return { id: lists[0].id, name: lists[0].name };
    }

    const listName = ActiveListElement.textContent;
    const activeList = lists.find(list => list.name === listName);
    return activeList;
  }


  function addList(event) {
    event.preventDefault();
    const listNameInput = newListForm.querySelector('#new-list-name');
    const listName = listNameInput.value.trim();

    if (listName && !lists.some(list => list.name === listName)) {
      const newList = { id: uniqueId(), name: listName };
      lists.push(newList);
      tasks[newList.id] = [];
      renderLists();
      listNameInput.value = '';
    }
  }

  function addTask(event) {
    event.preventDefault();
    const taskNameInput = newTaskForm.querySelector('#new-task-name');
    const taskName = taskNameInput.value.trim();
    const activeList = getActiveList();


    if (taskName && activeList) {
        if (!tasks[activeList.id]) {
            tasks[activeList.id] = []; 
        }
        tasks[activeList.id].push(taskName);
        renderTasks();
        taskNameInput.value = '';
    }
  }
}
// END
