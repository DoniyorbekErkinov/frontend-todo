export interface IApp {
    id: number;
    name: string;
    todos: ITodo[];
    createdAt: string;
}

export interface ITodo {
    id: number;
    name: string;
    isCompleted: boolean;
    isArchived: boolean;
    createdAt: string;
    tasks: ITask[]
}

export interface ITask {
    isCompleted: boolean;
    text: string;
}