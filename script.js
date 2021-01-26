class ToDoList {
  _form = document.querySelector('.form');
  _btnEnter = document.querySelector('.enter');
  _display = document.querySelector('.display');
  _inputTask = document.querySelector('.input-task');
  _task;
  _storedTasks = [];

  constructor() {
    this._init();
  }

  _init() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();

      this._insertTask(this._inputTask.value);
    });
    this._btnEnter.addEventListener('click', (e) => {
      this._insertTask(this._inputTask.value);
    });
    this._display.addEventListener('click', this._deleteTask.bind(this));

    this._loadTask();
  }

  _loadTask() {
    if (!localStorage.getItem('tasks')) return;

    document.querySelector('.empty').classList.add('hidden');

    this._storedTasks = localStorage.getItem('tasks').split(',');

    this._storedTasks.forEach((task) => {
      this._task = task;
      this._insertHtml();
    });
  }

  _insertTask(task) {
    document.querySelector('.empty').classList.add('hidden');

    if (!task) return;

    this._task = task;

    this._storedTasks.push(this._task);
    localStorage.setItem('tasks', this._storedTasks);

    this._insertHtml();

    this._inputTask.value = '';
    this._inputTask.blur();
  }

  _deleteTask(e) {
    if (!e.target.classList.contains('delete')) return;

    const task = e.target.closest('.task');
    const description = task.querySelector('.task-description').innerText;

    this._storedTasks.splice(
      this._storedTasks.findIndex((el) => el === description),
      1
    );

    localStorage.setItem('tasks', this._storedTasks);
    task.remove();

    if (this._storedTasks.length === 0)
      document.querySelector('.empty').classList.remove('hidden');
  }

  _insertHtml() {
    const markup = this._generateMarkup();

    this._display.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return `
      <div class="task">
        <img src="svg/arrow.svg" alt="" />
        <p class="task-description">
           ${this._task}
        </p>
        <img class="delete" src="svg/delete.svg" alt="" />
      </div>
      `;
  }
}

document.addEventListener('load', function () {
  const list = new ToDoList();
});
