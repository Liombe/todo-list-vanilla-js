const startDateFormatOptions = {
  weekday: "short",
  month: "short",
  day: "2-digit",
};

export class TodoList {
  #rootElement;
  #newTaskForm;
  #searchTaskForm;
  #tasksList;
  #query = "";

  constructor(id, todoListStore) {
    this.todoListStore = todoListStore;
    this.#rootElement = document.getElementById(id);

    this.createRootElement();
    this.bindEvents();
    this.render();

    this.render = this.render.bind(this);
  }

  createRootElement() {
    const defaultStartDateTimestamp =
      Date.now() - new Date().getTimezoneOffset() * 60000;
    const defaultStartDate = new Date(defaultStartDateTimestamp)
      .toJSON()
      .slice(0, 10);

    this.#rootElement.classList.add("todo-list");

    this.#rootElement.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="todo-list-header">
          <form id="newTask">
            <div class="form-control">
              <label for="label" class="sr-only">Titre</label>
              <input
                type="text"
                name="label"
                id="label"
                placeholder="Titre"
                required
              />
            </div>
            <div class="form-control">
              <label for="description" class="sr-only">Description</label>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Description"
              />
            </div>
            <div class="form-footer">
              <div class="form-control">
                <label for="start_date" class="sr-only">Start at</label>
                <input
                  type="date"
                  name="start_date"
                  id="start_date"
                  value="${defaultStartDate}"
                  placeholder="XX/XX/XXXX"
                  required
                />
              </div>
              <button class="btn" type="submit">Créer</button>
            </div>
          </form>
        </div>
        <div class="todo-list-body">
          <form id="searchTask">
            <div class="todo-list-search">
              <input type="text" name="query" placeholder="Faire les courses ou 12/12/2012" />
              <button type="submit" class="btn">Rechercher</button>
            </div>
          </form>
          <ul id="tasksList" class="todo-list-list"></ul>
        </div>
      `
    );

    this.#rootElement.querySelector("#label").focus();
    this.#rootElement.querySelector("#start_date").valueAsNumber =
      defaultStartDateTimestamp;
    this.#newTaskForm = this.#rootElement.querySelector("#newTask");
    this.#searchTaskForm = this.#rootElement.querySelector("#searchTask");
    this.#tasksList = this.#rootElement.querySelector("#tasksList");
  }

  handleSearch(evt) {
    evt.preventDefault();
    const query = new FormData(evt.currentTarget).get("query").toString();

    this.#query = query;
    this.render();
  }

  async handleNewTaskSubmit(evt) {
    evt.preventDefault();
    const label = new FormData(evt.currentTarget)
      .get("label")
      .toString()
      .trim();
    const description = new FormData(evt.currentTarget)
      .get("description")
      .toString()
      .trim();
    const startDate = new Date(
      new FormData(evt.currentTarget).get("start_date").toString().trim()
    );

    if (!label || !startDate) return;

    try {
      await this.todoListStore.createTask(
        {
          label,
          description,
          start_date: startDate,
        },
        this.render
      );
      this.#newTaskForm.reset();
    } catch (err) {
      console.error(err.cause);
    }

    this.#newTaskForm.querySelector('[name="label"]').focus();
  }

  bindEvents() {
    this.#rootElement.addEventListener("click", (evt) => {
      if (evt.target.matches("[data-task='complete']")) {
        const taskElement = evt.target.closest("[data-label]");
        this.todoListStore.completeTask(taskElement.dataset.label, this.render);
      }
    });

    this.#rootElement.addEventListener("click", (evt) => {
      if (evt.target.matches("[data-task='destroy']")) {
        const taskElement = evt.target.closest("[data-label]");
        this.todoListStore.destroyTask(taskElement.dataset.label, this.render);
      }
    });

    this.#searchTaskForm.addEventListener(
      "submit",
      this.handleSearch.bind(this)
    );

    this.#searchTaskForm.addEventListener(
      "input",
      this.handleSearch.bind(this)
    );

    this.#newTaskForm.addEventListener(
      "submit",
      this.handleNewTaskSubmit.bind(this)
    );
  }

  createTaskElementDate(date) {
    return new Date(date)
      .toLocaleDateString("fr-FR", startDateFormatOptions)
      .split(" ")
      .map((dateItem) => `<span>${dateItem}</span>`)
      .join("");
  }

  createTaskElement(task) {
    const taskElement = document.createElement("li");
    taskElement.dataset.label = task.label;
    taskElement.classList.add("todo-list-task");
    if (task.completed) taskElement.classList.add("completed");

    taskElement.insertAdjacentHTML(
      "afterbegin",
      `
        <time data-task="startDate">${this.createTaskElementDate(
          task.start_date
        )}</time>  
        <button type="button" ${
          task.completed ? "disabled" : ""
        } class="btn-checkbox task-complete" data-checked="${task.completed.toString()}" data-task="complete">
          <span class="sr-only">${
            task.completed ? "Complétée" : "Terminer"
          }</span>
        </button>
        <div class="task-body">
          <p data-task="label">${task.label}</p>
          <p data-task="description">${task.description}</p>
        </div>
        <button type="button" class="btn-icon task-destroy" data-task="destroy">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="16" height="16">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
          <span class="sr-only">Suppr.</span>
        </button>
      `
    );

    return taskElement;
  }

  renderTasksList() {
    this.#tasksList.replaceChildren(
      ...this.todoListStore
        .getAllTasks(this.#query)
        .map((task) => this.createTaskElement(task))
    );
  }

  render() {
    this.renderTasksList();
  }
}
