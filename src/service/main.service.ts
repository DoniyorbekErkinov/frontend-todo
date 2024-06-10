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

  // Update a specific app name
  updateAppName(appId: number, appName: { name: string }) {
    return ApiService.put(`apps/${appId}`, appName);
  },

  // Delete a specific app
  deleteApp(appId: number) {
    return ApiService.delete(`apps/${appId}`);
  },
  // Create a new todo in a specific app
  createTodo(appId: number, todoData: { name: string }) {
    return ApiService.post(`apps/${appId}/todos/new`, todoData);
  },

  // Update a specific todo name in a specific app
  updateTodoName(appId: number, todoId: number, todoName: { name: string }) {
    return ApiService.put(`apps/${appId}/todos/${todoId}`, todoName);
  },

  // Delete a specific todo in a specific app
  deleteTodo(appId: number, todoId: number) {
    return ApiService.delete(`apps/${appId}/todos/${todoId}`);
  },

  // Archive a specific todo in a specific app
  archiveTodo(appId: number, todoId: number) {
    return ApiService.put(`apps/${appId}/todos/${todoId}/archive`, {});
  },

  // Unarchive a specific todo in a specific app
  unarchiveTodo(appId: number, todoId: number) {
    return ApiService.put(`apps/${appId}/todos/${todoId}/unarchive`, {});
  },

  // Add a task to a specific todo in a specific app
  addTask(appId: number, todoId: number, taskData: { text: string }) {
    return ApiService.post(`apps/${appId}/todos/${todoId}/tasks`, taskData);
  },

  // Update a task in a specific todo in a specific app
  updateTask(appId: number, todoId: number, taskId: number, taskData: { text: string, isCompleted: boolean }) {
    return ApiService.put(`apps/${appId}/todos/${todoId}/tasks/${taskId}`, taskData);
  },

  // Delete a task in a specific todo in a specific app
  deleteTask(appId: number, todoId: number, taskId: number) {
    return ApiService.delete(`apps/${appId}/todos/${todoId}/tasks/${taskId}`);
  },

  // Get tasks of a specific todo in a specific app
  getTasks(appId: number, todoId: number) {
    return ApiService.get(`apps/${appId}/todos/${todoId}/tasks`);
  },

  // Check or uncheck a todo
  toggleTodoCompletion(appId: number, todoId: number) {
    return ApiService.put(`apps/${appId}/todos/${todoId}/check`, {});
  },

  // Check or uncheck a task in a specific todo in a specific app
  toggleTaskCompletion(appId: number, todoId: number, taskId: number) {
    return ApiService.put(`apps/${appId}/todos/${todoId}/tasks/${taskId}/toggle`, {});
  },
  searchAndFilterTodos(appId: number, queryParams: any) {
    return ApiService.post(`apps/${appId}/todos`, queryParams);
  },
};

export default MainService;
