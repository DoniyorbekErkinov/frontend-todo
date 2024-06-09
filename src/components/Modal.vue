<template>
    <transition name="modal-slide">
      <div v-if="props.close" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <transition name="modal-content">
          <div v-if="props.close" class="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full flex flex-col justify-between">
            <div class="w-full flex justify-between relative">
              <h2 class="text-2xl mb-4 text-mainBlue">{{ props.title }}</h2>
              <button @click="closeModal" class="text-mainBlue shadow-md w-10 h-10 rounded-full">
                &times;
              </button>
            </div>
            <div class="w-full">
              <slot></slot>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </template>
  
  <script setup lang="ts">
  interface IProps {
      close: boolean;
      title: string;
  }
  const props = defineProps<IProps>();
  const emits = defineEmits(['close']);
  
  const closeModal = () => {
      emits('close');
  };
  </script>
  
  <style scoped>
  .modal-slide-enter-active, .modal-slide-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  .modal-slide-enter-from, .modal-slide-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }
  
  .modal-content-enter-active, .modal-content-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  .modal-content-enter-from, .modal-content-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }
  </style>
  