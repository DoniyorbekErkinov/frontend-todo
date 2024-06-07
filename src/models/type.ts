export interface IApp {
    id: number;
    name: string;
    todos: ITodo[]
}

export interface ITodo {
    id: number;
    name: string;
    isCompleted: boolean;
    isArchived: boolean;
    tasks: ITask[]
}

export interface ITask {
    isCompleted: boolean;
    text: string;
}