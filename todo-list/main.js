import { TodoList } from "./js/todo-list";
import { TodoListStore } from "./js/todo-list-store";
import "./style.css";

async function main() {
  const todoListStore = new TodoListStore();
  await todoListStore.fetchTasks();
  new TodoList("todoList", todoListStore);
}

document.addEventListener("DOMContentLoaded", main);
