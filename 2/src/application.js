import axios from 'axios';

const routes = {
  tasksPath: () => '/api/tasks',
};

// BEGIN
export default async () => {
  const form = document.querySelector('form');
  const input = document.querySelector('input[name="name"]');
  const listTasksElement = document.getElementById('tasks');

  const state = {
    tasks: [],
    loading: null, 
    error: [], 
  };

  const renderTasks = (stateTasks) => {
    listTasksElement.innerHTML = '';
    stateTasks.map((task) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.textContent = task;
      listTasksElement.append(li);
    });
    input.focus();
  };

  const loadTasks = async () => {
    const response = await axios.get(routes.tasksPath());
    const tasksList = response.data.items;
    state.tasks = [];
    tasksList.map(task => (state.tasks.push(task.name)));
  };

  const addTask = async (taskName) => {
      const response = await axios.post(routes.tasksPath(), { name: taskName });
      if (response.status === 201) {
        state.loading = true;
      } 
      else {
        state.loading = false;
        state.error = 'Не удалось добавить задачу.';
      }
    };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const taskName = input.value.trim();
    await addTask(taskName);
    if (state.loading === true) {
      await loadTasks();
      renderTasks(state.tasks);
    }
  })

  await loadTasks();
  renderTasks(state.tasks);
  
}
// END
