<template>
    <div class="header bg-mainBlue">
      <div @click="() => router.push({ name: 'Home' })" class="cursor-pointer">TooooDoooo App</div>            
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  const router = useRouter();
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
  