import { deleteTask, getTasks, postTask, putTask } from "./api";
import { Toast } from "./toast-center";

export class TodoListStore {
  constructor() {
    this.tasks = [];
  }

  getAllTasks(query = "") {
    let filteredTasks = this.tasks;
    const queryRegex = new RegExp(query, "i");

    if (query) {
      filteredTasks = this.tasks.filter(
        (task) =>
          task.label.match(queryRegex) ||
          task.description.match(queryRegex) ||
          new Date(task.start_date).toLocaleDateString().match(queryRegex)
      );
    }

    return filteredTasks.sort(
      (a, b) => new Date(a.start_date) - new Date(b.start_date)
    );
  }

  getTask(taskLabel) {
    return this.tasks.find((task) => task.label === taskLabel);
  }

  updateTask(taskLabel, data) {
    const taskIndex = this.tasks.findIndex((task) => task.label === taskLabel);
    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...data };
  }

  removeTask(taskLabel) {
    const taskIndex = this.tasks.findIndex((task) => task.label === taskLabel);
    this.tasks.splice(taskIndex, 1);
  }

  async fetchTasks() {
    const tasks = (await getTasks()) || [];
    if (tasks) {
      this.tasks = tasks.map((task) => ({
        ...task,
        completed: Boolean(task.end_date),
      }));
    } else {
      this.tasks = [];
    }
  }

  async createTask(data, callback) {
    try {
      await postTask(data);
      data.completed = false;
      this.tasks.unshift(data);
      callback();
    } catch (err) {
      if (err.cause) {
        if (err.cause.status === 409) {
          new Toast("error", "Cette tâche existe déjà.");
          throw err;
        }

        if (err.cause.status === 400) {
          new Toast(
            "error",
            "La tâche n'a pas pu être créée",
            "Vérifier les données envoyées."
          );
        }
      }
    }
  }

  async completeTask(taskLabel, callback) {
    const data = { end_date: new Date() };
    try {
      await putTask(taskLabel, data);
      data.completed = true;
      this.updateTask(taskLabel, data);
      callback();
    } catch (err) {
      if (err.cause) {
        if (err.cause.status === 404) {
          new Toast("error", "Cette tâche n'existe pas.");
        }
      }
    }
  }

  async destroyTask(taskLabel, callback) {
    try {
      await deleteTask(taskLabel);
      this.removeTask(taskLabel);
      callback();
    } catch (err) {
      if (err.cause) {
        if (err.cause.status === 404) {
          new Toast("error", "Cette tâche n'existe pas.");
        }
      }
    }
  }
}
