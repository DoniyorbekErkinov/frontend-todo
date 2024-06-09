<script setup lang="ts">
import { ref } from 'vue';
import AppCard from "@/components/AppCard.vue";
import { useMainStore } from "@/store/main.store";
import Modal from '@/components/Modal.vue';
import { IApp } from '@/models/type';
import { MoodEmptyIcon } from 'vue-tabler-icons';
import axios from 'axios';

const store = useMainStore();
const modal = ref<boolean>(false);
const newAppName = ref<string>('');
const isCreate = ref<boolean>(false);
const appId = ref<number>(0);
const fileInputRef = ref<HTMLInputElement | null>(null); // Reference to file input element

const openModal = () => {
    modal.value = true;
    isCreate.value = true;
};

const addApp = async () => {
    if (isCreate.value) {
        await store.CreateApp(newAppName.value);
    } else {
        await store.EditApp({ id: appId.value, name: newAppName.value });
    }
    modal.value = false;
    newAppName.value = '';
    store.GetApps();
};

const Edit = (e: IApp) => {
    appId.value = e.id;
    newAppName.value = e.name;
    modal.value = true;
};

// Handle JSON import for a specific app
const handleFileUpload = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            if (e.target?.result) {
                const importedApp = JSON.parse(e.target.result as string);
                await axios.post('http://localhost:3000/apps/import', importedApp);
                store.GetApps();
            }
        };
        reader.readAsText(file);
    }
};

// Trigger file input for importing
const triggerFileInput = () => {
    fileInputRef.value?.click();
};

// Download JSON for a specific app
const downloadJSON = async (app: IApp) => {
    const response = await axios.get(`http://localhost:3000/apps/${app.id}/export`);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(response.data));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${app.name}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
};

store.GetApps();
</script>

<template>
    <div>
        <div class="w-full flex justify-end mb-4">
            <button @click="openModal" class="bg-slate-100 text-mainBlue py-1 px-4 rounded-md shadow-md mr-4">
                Add
            </button>
            <input type="file" ref="fileInputRef" @change="handleFileUpload" accept=".json" class="hidden" />
            <button @click="triggerFileInput" class="bg-slate-100 text-mainBlue py-1 px-4 rounded-md shadow-md">
                Import JSON
            </button>
        </div>
        <div v-if="store.getApps.length > 0" class="grid grid-cols-4 gap-8 mt-4">
            <div v-for="(app, i) in store.getApps" :key="i">
                <AppCard :app="app" @edit="Edit" @downloadJSON="(e: IApp) => downloadJSON(e)"/>                
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
