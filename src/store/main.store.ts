import { defineStore } from 'pinia'
import { IApp, ITodo } from '@/models/type'
import MainService from '@/service/main.service'
import { AxiosResponse } from 'axios'
interface IMainStore {
    apps: IApp[];
    todos: ITodo[];
    todo: ITodo | null;
}
export const useMainStore = defineStore('main', {
    state: (): IMainStore => ({
        apps: [],
        todos: [],
        todo: null
    }),
    getters: {
        getApps(): IApp[] {
            return this.apps
        },
        getTodos(): ITodo[] {
            return this.todos
        }
    },
    actions: {
        GetApps() {
            this.apps = []
            MainService.getApps().then((res: any) => {
                this.apps = res.data
            })
        },
        async CreateApp(name: string) {
            await MainService.createApp({ name }).then((res: AxiosResponse) => {
                console.log(res);
            })
        },
        async EditApp(data: { id: number, name: string }) {
            await MainService.updateAppName(data.id, { name: data.name }).then((res: AxiosResponse) => {
                console.log(res);
            })
        },
        async GetTodos(appId: number) {
            await MainService.getTodos(appId).then((res: AxiosResponse) => {
                this.todos = res.data
            })
        },
        async CreateTodo(appId: number, name: string) {
            await MainService.createTodo(appId, { name }).then((res: AxiosResponse) => {
                console.log(res);
            })
        },
        async EditTodo(data: { appId: number, todoId: number, name: string }) {
            await MainService.updateTodoName(data.appId, data.todoId, { name: data.name }).then((res: AxiosResponse) => {
                console.log(res);
            })
        },
    }
})