import { defineStore } from 'pinia'
import { IApp, ITodo, ITask } from '@/models/type'
import MainService from '@/service/main.service'
import { AxiosResponse } from 'axios'

interface IMainStore {
    apps: IApp[];
    todos: ITodo[];
    tasks: ITask[];
    todo: ITodo | null;
    task: ITask | null;
}

export const useMainStore = defineStore('main', {
    state: (): IMainStore => ({
        apps: [],
        todos: [],
        tasks: [],
        todo: null,
        task: null
    }),
    getters: {
        getApps(): IApp[] {
            return this.apps;
        },
        getTodos(): ITodo[] {
            return this.todos;
        },
        getTasks(): ITask[] {
            return this.tasks;
        }
    },
    actions: {
        async GetApps() {
            this.apps = [];
            await MainService.getApps().then((res: any) => {
                this.apps = res.data;
            });
        },
        async CreateApp(name: string) {
            await MainService.createApp({ name }).then((res: AxiosResponse) => {
                console.log(res);
                this.GetApps();
            });
        },
        async EditApp(data: { id: number, name: string }) {
            await MainService.updateAppName(data.id, { name: data.name }).then((res: AxiosResponse) => {
                console.log(res);
                this.GetApps();
            });
        },
        async DeleteApp(appId: number) {
            await MainService.deleteApp(appId).then((res: AxiosResponse) => {
                console.log(res);
                this.GetApps();
            });
        },
        async GetTodos(appId: number) {
            await MainService.getTodos(appId).then((res: AxiosResponse) => {
                this.todos = res.data;
            });
        },
        async CreateTodo(appId: number, name: string) {
            await MainService.createTodo(appId, { name }).then((res: AxiosResponse) => {
                console.log(res);
                this.GetTodos(appId);
            });
        },
        async EditTodo(data: { appId: number, todoId: number, name: string }) {
            await MainService.updateTodoName(data.appId, data.todoId, { name: data.name }).then((res: AxiosResponse) => {
                console.log(res);
                this.GetTodos(data.appId);
            });
        },
        async DeleteTodo(appId: number, todoId: number) {
            await MainService.deleteTodo(appId, todoId).then((res: AxiosResponse) => {
                console.log(res);
                this.GetTodos(appId);
            });
        },
        async CreateTask(appId: number, todoId: number, taskData: { text: string, isCompleted: boolean }) {
            await MainService.addTask(appId, todoId, taskData).then((res: AxiosResponse) => {
                console.log(res);
                this.GetTasks(appId, todoId);
            });
        },
        async DeleteTask(appId: number, todoId: number, taskId: number) {
            await MainService.deleteTask(appId, todoId, taskId).then((res: AxiosResponse) => {
                console.log(res);
                this.GetTasks(appId, todoId);
            });
        },
        async GetTasks(appId: number, todoId: number) {
            await MainService.getTasks(appId, todoId).then((res: AxiosResponse) => {
                this.tasks = res.data;
            });
        },
        async ToggleTodoCompletion(appId: number, todoId: number) {
            await MainService.toggleTodoCompletion(appId, todoId).then((res: AxiosResponse) => {
                console.log(res);
                this.GetTodos(appId);
            });
        },
        async ToggleTaskCompletion(appId: number, todoId: number, taskId: number) {
            await MainService.toggleTaskCompletion(appId, todoId, taskId).then((res: AxiosResponse) => {
                console.log(res);
                this.GetTasks(appId, todoId);
            });
        }
    }
});
