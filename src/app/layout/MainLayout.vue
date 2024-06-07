<script setup lang="ts">
import Header from "./Header.vue";
import Footer from "./Footer.vue";
</script>

<template>
  <div class="container">
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
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;

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
