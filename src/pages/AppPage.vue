<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useMainStore } from '@/store/main.store';
import { PlusIcon, MoodEmptyIcon, XIcon, EditCircleIcon, SearchIcon, TrashIcon } from 'vue-tabler-icons';
import { ref, watch } from 'vue';
import TodoCard from "@/components/TodoCard.vue";
import Modal from '@/components/Modal.vue';
import SidebarWithOverlay from '@/components/SideBar.vue';
import { ITodo } from '@/models/type';

// Consts
const store = useMainStore();
const route = useRoute();
const router = useRouter();
const appName = ref<string>("");
const appId = ref<number>(0);
const modal = ref<boolean>(false);
const todoName = ref<string>('');
const isCreate = ref<boolean>(false);
const chosenTodo = ref<ITodo | null>(null);
const sidebarOpen = ref<boolean>(false);
const searchQuery = ref<string | undefined>(store.filter.query);
const filterArchived = ref<boolean | null | undefined>(store.filter.archived);
const filterCompleted = ref<boolean | null | undefined>(store.filter.completed);
// Consts

appName.value = String(route.query.name).replace("_", " ");
appId.value = Number(route.params.appId);

// Query Route
const applyFiltersFromQuery = () => {
    searchQuery.value = route.query.query as string || '';
    filterArchived.value = route.query.archived !== undefined ? route.query.archived === 'true' : null;
    filterCompleted.value = route.query.completed !== undefined ? route.query.completed === 'true' : null;
    store.filter.query = searchQuery.value;
    store.filter.archived = filterArchived.value;
    store.filter.completed = filterCompleted.value;
    store.SearchAndFilterTodos(appId.value);
};

    if (route.params.appId) {
        document.title = appName.value;
        applyFiltersFromQuery();
    }

const updateQueryParams = () => {
    router.push({
        query: {
            ...route.query,
            query: searchQuery.value || undefined,
            archived: filterArchived.value !== null ? String(filterArchived.value) : undefined,
            completed: filterCompleted.value !== null ? String(filterCompleted.value) : undefined
        }
    });
    store.SearchAndFilterTodos(appId.value);
};
// Query Route
// Modal
const openModal = () => {
    modal.value = true;
    isCreate.value = true;
};

const addTodo = async () => {
    if (isCreate.value) {
        await store.CreateTodo(appId.value, todoName.value);
    } else {
        // @ts-ignore
        await store.EditTodo({ appId: appId.value, todoId: chosenTodo.value?.id, name: todoName.value });
        if (chosenTodo.value) {
            chosenTodo.value.name = todoName.value;
        }
    }
    modal.value = false;
    todoName.value = '';
    store.SearchAndFilterTodos(appId.value);
};
// Modal

// Todo Edit
const showEditTodo = ref<boolean>(false);
const enableEditTodo = () => {
    if (chosenTodo.value) {
        todoName.value = chosenTodo.value.name;
        showEditTodo.value = true;
    }
};

const submitEditTodo = async () => {
    if (chosenTodo.value?.id) {
        await store.EditTodo({ appId: appId.value, todoId: chosenTodo.value.id, name: todoName.value });
        if (chosenTodo.value) {
            chosenTodo.value.name = todoName.value;
        }
        showEditTodo.value = false;
        await store.SearchAndFilterTodos(appId.value);
    }
};
// Todo Edit
// Todo Completion
const ToggleTodoCompletion = async () => {
  if(chosenTodo.value?.id) {
    await store.ToggleTodoCompletion(appId.value, chosenTodo.value.id)
    sidebarOpen.value = false
    await store.SearchAndFilterTodos(appId.value)
  }
};
// Todo Completion
// Sidebar toggle
const openSidebar = async (todo: ITodo) => {
    chosenTodo.value = todo;
    if (chosenTodo.value?.id) {
        await store.GetTasks(appId.value, chosenTodo.value.id);
        sidebarOpen.value = true;
    }
};
// Sidebar toggle

// All Tasks Crud
const showAddTask = ref<boolean>(false);
const newTaskText = ref<string>("");
const toggleAddTask = () => {
    showAddTask.value = !showAddTask.value;
    newTaskText.value = ""
};
const addTask = async () => {
    if (!newTaskText.value) return;
    if (chosenTodo.value?.id) {
        await store.CreateTask(appId.value, chosenTodo.value?.id, { text: newTaskText.value, isCompleted: false });
        showAddTask.value = false;
        await store.GetTasks(appId.value, chosenTodo.value.id);
        newTaskText.value = "";
    }
};

const updateTask = async (index: number) => {
    if (chosenTodo.value?.id) {
        await store.ToggleTaskCompletion(appId.value, chosenTodo.value?.id, index);
        await store.GetTasks(appId.value, chosenTodo.value.id);
    }
};

const deleteTask = async (index: number) => {
    if (chosenTodo.value?.id) {
        await store.DeleteTask(appId.value, chosenTodo.value?.id, index);
        await store.GetTasks(appId.value, chosenTodo.value.id);
    }
};

const DeleteTodo = async () => {
  if(chosenTodo.value?.id) {
    await store.DeleteTodo(appId.value, chosenTodo.value.id)
    sidebarOpen.value = false
    await store.SearchAndFilterTodos(appId.value)
  }
}
// All Tasks Crud
// Filters
const handleSearch = () => {
    updateQueryParams();
};

const handleEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
};

watch([filterArchived, filterCompleted], () => {  
    store.filter.archived = filterArchived.value;
    store.filter.completed = filterCompleted.value;
    updateQueryParams();
    store.SearchAndFilterTodos(appId.value)
});
// Filters

</script>

<template>
  <div class="flex flex-col h-full">
    <div class="w-full flex justify-between">
      <div class="text-xl text-mainBlue">{{ appName }}</div>
      <div class="flex space-x-2">
        <button @click="openModal" class="p-2 bg-white shadow-md rounded-md flex justify-between items-center text-mainBlue">
          Add Todo
          <PlusIcon class="ml-2" />
        </button>
      </div>
    </div>
    <!-- Filters -->
    <div class="flex space-x-2 mt-4">
      <!-- Search -->
      <div class="relative w-1/3">
        <input type="text" v-model="searchQuery" @keyup="handleEnter" placeholder="Search Todos" class="p-2 border rounded-md w-full" />
        <button @click="handleSearch" class="absolute right-0 top-0 h-full px-3 bg-mainBlue text-white rounded-r-md">
          <SearchIcon />
        </button>
      </div>
      <select v-model="filterArchived" class="p-2 border rounded-md">
        <option :value="null">All</option>
        <option :value="true">Archived</option>
        <option :value="false">Active</option>
      </select>
      <select v-model="filterCompleted" class="p-2 border rounded-md">
        <option :value="null">All</option>
        <option :value="true">Completed</option>
        <option :value="false">Incomplete</option>
      </select>
    </div>
    <!-- Filters -->
     <!-- Todos -->
     <div v-if="store.getTodos.length > 0" class="grid grid-cols-4 gap-4 mt-4">
       <TodoCard :todo="todo" v-for="(todo, i) in store.getTodos" :key="i" @click="openSidebar(todo)" />
     </div>
     <div v-else class="w-full h-full flex flex-1 justify-center items-center">
       <div class="flex flex-col items-center justify-center">
         <div class="h-20 w-20">
           <MoodEmptyIcon class="text-mainBlue" size="80" />
         </div>
         <div class="text-mainBlue text-xl"> Not Found</div>
       </div>
     </div>
     <!-- Todos -->
      <!-- Add Todo Modal -->
      <Modal v-if="modal" :title="isCreate ? 'Add Todo' : 'Edit Todo'" :close="modal" @close="(e: boolean) => modal = e">
        <form @submit.prevent="addTodo">
          <div class="mb-4">
            <label class="block text-mainBlue">Todo Name:</label>
            <input placeholder="Todo Name" v-model="todoName" type="text"
              class="w-full px-3 py-2 border rounded-md focus:outline-mainBlue" required />
          </div>
          <div class="flex justify-end">
            <button type="submit" class="bg-mainBlue text-white py-2 px-4 rounded-md">
              {{ isCreate ? 'Add Todo' : 'Edit Todo' }}
            </button>
          </div>
        </form>
      </Modal>
      <!-- Add Todo Modal -->
       <!-- Sidebar -->
       <SidebarWithOverlay :isVisible="sidebarOpen" @close="() => { sidebarOpen = false; showEditTodo = false }">
         <div>
           <div class="w-full flex justify-between items-center" v-if="!showEditTodo">
             <span :class="chosenTodo?.isCompleted ? 'line-through' : ''">{{ chosenTodo?.name }}</span>
             <div v-if="chosenTodo" class="flex items-center">
               <input class="h-4 w-4 mr-2" type="checkbox" 
               v-model="chosenTodo.isCompleted" @change="ToggleTodoCompletion"/>
               <EditCircleIcon @click="enableEditTodo" class="cursor-pointer shadow-md rounded-full p-1 bg-white" />
               <TrashIcon @click="DeleteTodo" class="cursor-pointer shadow-md rounded-full p-1 bg-red-500 text-white" />
             </div>
           </div>
           <div v-else>
             <input v-model="todoName" @keyup.enter="submitEditTodo" class="border p-1 rounded" />
             <button @click="submitEditTodo" class="ml-2 bg-mainBlue text-white py-1 px-2 rounded-md">Save</button>
           </div>
         </div>
         <hr class="my-1" />
         <div>
           <div class="w-full flex justify-end">
             <button
               class="bg-mainBlue text-white py-1 px-2 rounded-md text-xs"
               @click="toggleAddTask"
             >
               Add Task
             </button>
           </div>
           <transition name="dropdown">
             <div v-if="showAddTask" class="mt-2 flex justify-between items-center gap-4">
               <input
                 type="text"
                 v-model="newTaskText"
                 placeholder="Enter task"
                 class="border rounded-md w-full p-2 h-10 focus:outline-none"
               />
               <button
                 class="bg-green-500 text-white px-2 rounded-md mt-1 text-xs h-10 w-24"
                 @click="addTask"
               >
                 Save Task
               </button>
             </div>
           </transition>
           <div class="w-full flex flex-col">
             <div class="flex justify-between mt-2" v-for="(task, i) in store.getTasks">
               <div :class="task.isCompleted ? 'line-through' : ''">
                 {{ i + 1 }}. {{ task.text }}
               </div>
               <div class="flex items-center">
                 <input type="checkbox" :value="task.isCompleted" v-model="task.isCompleted" @change="updateTask(i)" />
                 <XIcon class="cursor-pointer" @click="deleteTask(i)" />
               </div>
             </div>
           </div>
         </div>
       </SidebarWithOverlay>
       <!-- Sidebar -->
  </div>
</template>


<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}
.dropdown-enter,
.dropdown-leave-to /* .dropdown-leave-active in <2.1.8 */ {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}
</style>
