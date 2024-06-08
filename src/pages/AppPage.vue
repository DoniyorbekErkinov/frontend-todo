<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useMainStore } from '@/store/main.store';
import { PlusIcon } from 'vue-tabler-icons';
import { ref } from 'vue';
import { MoodEmptyIcon } from 'vue-tabler-icons';
import TodoCard from "@/components/TodoCard.vue"
import Modal from '@/components/Modal.vue';
import { ITodo } from '@/models/type';

const store = useMainStore()
const route = useRoute()
const appName = ref<string>("")
const appId = ref<number>(0)
const modal = ref<boolean>(false);
const todoName = ref<string>('');
const isCreate = ref<boolean>(false)
const chosenTodo = ref<number>(0)

appName.value = String(route.query.name).replace("_", " ")
appId.value = Number(route.params.appId)
if (route.params.appId) {
    store.GetTodos(appId.value)
}

const openModal = () => {
    modal.value = true;
    isCreate.value = true;
};

const addTodo = async () => {
    if (isCreate.value) {
        await store.CreateTodo(appId.value, todoName.value)
    } else {
        await store.EditTodo({ appId: appId.value, todoId: chosenTodo.value, name: todoName.value })
    }
    modal.value = false;
    todoName.value = '';
    store.GetTodos(appId.value)
};
const Edit = (e: ITodo) => {
    appId.value = e.id
    todoName.value = e.name
    modal.value = true;
}
</script>
<template>
    <div class="flex flex-col h-full">
        <div class="w-full flex justify-between">
            <div class="text-xl text-mainBlue">{{ appName }}</div>
            <div>
                <button @click="openModal" class="p-2 bg-white shadow-md rounded-md flex justify-between items-center text-mainBlue">
                    Add Todo
                    <PlusIcon class="ml-2" />
                </button>
            </div>
        </div>
        <div v-if="store.getTodos.length > 0" class="grid grid-cols-6 gap-4">
            <TodoCard :todo="todo" v-for="(todo, i) in store.getTodos" :key="i" />
        </div>
        <div v-else class="w-full h-full flex flex-1 justify-center items-center">
            <div class="flex flex-col items-center justify-center">
                <div class="h-20 w-20">
                    <MoodEmptyIcon class="text-mainBlue" size="80" />
                </div>
                <div class="text-mainBlue text-xl"> Not Found</div>
            </div>
        </div>
        <Modal v-if="modal" :title="isCreate ? 'Add Todo' : 'Edit Todo'" :close="modal"
            @close="(e: boolean) => modal = e">
            <form @submit.prevent="addTodo">
                <div class="mb-4">
                    <label class="block text-mainBlue">Todo Name:</label>
                    <input placeholder="Todo Name" v-model="todoName" type="text"
                        class="w-full px-3 py-2 border rounded-md focus:outline-mainBlue" required />
                </div>
                <div class="flex justify-end">
                    <button type="submit" class="bg-mainBlue text-white py-2 px-4 rounded-md">
                        Add App
                    </button>
                </div>
            </form>
        </Modal>
    </div>
</template>