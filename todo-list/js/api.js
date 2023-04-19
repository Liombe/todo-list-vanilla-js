import { apiFetch } from "./helper";

const TASK_API_URL = "http://localhost:9000/v1";

function taskApiFetch(endpoint, method = "GET", data) {
  return apiFetch(`${TASK_API_URL}${endpoint}`, method, data);
}

export function getTasks() {
  return taskApiFetch("/tasks");
}

export function getTask(taskId) {
  return taskApiFetch(`/tasks/${taskId}`);
}

export function postTask(data) {
  return taskApiFetch("/tasks", "POST", data);
}

export function putTask(taskId, data) {
  return taskApiFetch(`/tasks/${taskId}`, "PUT", data);
}

export function deleteTask(taskId) {
  return taskApiFetch(`/tasks/${taskId}`, "DELETE");
}
