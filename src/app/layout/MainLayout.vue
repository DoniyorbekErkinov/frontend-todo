<script setup lang="ts">
import Header from "./Header.vue";
import Footer from "./Footer.vue";
</script>

<template>
  <div class="wrapper">
    <main class="main">
      <div class="page">
        <Header />
        <div class="content">
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </div>
        <Footer />
      </div>
    </main>
  </div>
</template>

<style scoped>
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;

}

.main {
  display: flex;
  flex: 1;
  width: 100%;
}

.page {
  padding: 0;
  margin: 0 auto;
  width: 100%;
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.content {
  flex: 1;
  padding: 1rem 8rem;
  width: 100%;
  background-color: #fafafa
}
</style>
