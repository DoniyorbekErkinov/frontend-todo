<template>
    <div class="header bg-mainBlue">
      <div @click="() => router.push({ name: 'Home' })" class="cursor-pointer">TooooDoooo App</div>
      <div v-if="route.name == 'Home'">
        <button @click="openModal" class="bg-white text-mainBlue py-1 px-4 rounded-md shadow-md">
          Add
        </button>
      </div>
      <Modal v-if="modal" title="Add App" :close="modal" @close="(e: boolean) => modal = e ">        
        <form @submit.prevent="addApp">
          <div class="mb-4">
            <label class="block text-mainBlue">App Name:</label>
            <input placeholder="App Name"v-model="newAppName" type="text" class="w-full px-3 py-2 border rounded-md focus:outline-mainBlue" required />
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
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import Modal from '@/components/Modal.vue';
  
  const route = useRoute();
  const router = useRouter();
  const modal = ref<boolean>(false);
  const newAppName = ref<string>('');
  
  const openModal = () => {
    modal.value = true;
  };
  
  const addApp = () => {
    // Handle adding the new app
    console.log('New App Name:', newAppName.value);
    modal.value = false;
    newAppName.value = '';
  };
  </script>
  
  <style scoped>
  .header {
    color: #fff;
    padding: 1rem 8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  </style>
  