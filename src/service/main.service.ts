import { ApiService } from "./api.service";

const MainService = {
  // Get all apps
  getApps() {
    return ApiService.get("apps");
  },

  // Create a new app
  createApp(appData: { name: string }) {
    return ApiService.post("apps", appData);
  },

  // Get todos of a specific app
  getTodos(appId: number) {
    return ApiService.get(`apps/${appId}/todos`);
  },

  // Create a new todo in a specific app
  createTodo(appId: number, todoData: { name: string }) {
    return ApiService.post(`apps/${appId}/todos`, todoData);
  },

  // Update a specific app name
  updateAppName(appId: number, appName: { name: string }) {
    return ApiService.put(`apps/${appId}`, appName);
  },

  // Update a specific todo name in a specific app
  updateTodoName(appId: number, todoId: number, todoName: { name: string }) {
    return ApiService.put(`apps/${appId}/todos/${todoId}`, todoName);
  },

  // Archive a specific todo in a specific app
  archiveTodo(appId: number, todoId: number) {
    return ApiService.put(`apps/${appId}/todos/${todoId}/archive`, {});
  },

  // Add a task to a specific todo in a specific app
  addTask(appId: number, todoId: number, taskData: { text: string }) {
    return ApiService.post(`apps/${appId}/todos/${todoId}/tasks`, taskData);
  },

  // Update a task in a specific todo in a specific app
  updateTask(appId: number, todoId: number, taskId: number, taskData: { text: string, isCompleted: boolean }) {
    return ApiService.put(`apps/${appId}/todos/${todoId}/tasks/${taskId}`, taskData);
  },

  // Check or uncheck a todo
  toggleTodoCompletion(appId: number, todoId: number) {
    return ApiService.put(`apps/${appId}/todos/${todoId}/check`, {});
  }
};

export default MainService;
