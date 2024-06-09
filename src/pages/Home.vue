<script setup lang="ts">
import { ref } from 'vue';
import AppCard from "@/components/AppCard.vue";
import { useMainStore } from "@/store/main.store";
import Modal from '@/components/Modal.vue';
import { IApp } from '@/models/type';
import { MoodEmptyIcon } from 'vue-tabler-icons';

const store = useMainStore()
const modal = ref<boolean>(false);
const newAppName = ref<string>('');
const isCreate = ref<boolean>(false)
const appId = ref<number>(0)

const openModal = () => {
    modal.value = true;
    isCreate.value = true;
};

const addApp = async () => {
if(isCreate.value) {
    await store.CreateApp(newAppName.value)
} else {
    await store.EditApp({id: appId.value, name: newAppName.value})
}
    modal.value = false;
    newAppName.value = '';
    store.GetApps()
};
const Edit = (e: IApp) => {    
    appId.value = e.id
    newAppName.value = e.name
    modal.value = true;
}

store.GetApps()
</script>
<template>
    <div>
        <div class="w-full flex justify-end">
            <button @click="openModal" class="bg-slate-100 text-mainBlue py-1 px-4 rounded-md shadow-md">
                Add
            </button>
        </div>
        <div v-if="store.getApps.length > 0" class="grid grid-cols-4 gap-8 mt-4">
            <div v-for="(app, i) in store.getApps">
                <AppCard :app="app" @edit="Edit"/>
            </div>
        </div>
        <div v-else class="w-full h-full flex flex-1 justify-center items-center mt-4">
            <div class="flex flex-col items-center justify-center">
              <div class="h-20 w-20">
                <MoodEmptyIcon class="text-mainBlue" size="80" />
              </div>
              <div class="text-mainBlue text-xl"> Not Found</div>
            </div>
          </div>
        <Modal v-if="modal" :title="isCreate ? 'Add App' : 'Edit App'" :close="modal" @close="(e: boolean) => modal = e">
            <form @submit.prevent="addApp">
                <div class="mb-4">
                    <label class="block text-mainBlue">App Name:</label>
                    <input placeholder="App Name" v-model="newAppName" type="text"
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