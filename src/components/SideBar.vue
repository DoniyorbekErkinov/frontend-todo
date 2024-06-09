<template>
    <div>
      <transition name="fade">
        <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="close"></div>
      </transition>
      <transition name="sidebar">
        <div v-if="isVisible" class="fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50">
          <button @click="close" class="p-2">
            <XIcon class="text-mainBlue"/>
          </button>
          <div class="p-4">
            <!-- Sidebar content -->
            <slot></slot>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import {XIcon} from "vue-tabler-icons"
  
  const props = defineProps<{ isVisible: boolean }>();
  const emits = defineEmits(['close']);
  
  const close = () => {
    emits('close');
  };
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  .sidebar-enter-active, .sidebar-leave-active {
    transition: transform 0.3s ease;
  }
  .sidebar-enter-from, .sidebar-leave-to {
    transform: translateX(100%);
  }
  </style>
  