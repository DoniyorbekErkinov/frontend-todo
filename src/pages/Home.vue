<script setup lang="ts">
import {ref} from "vue"
import { ApiService } from "@/service/api.service";
import { IApp } from "@/models/type";
import AppCard from "@/components/AppCard.vue";
const data = ref<IApp[]>([])
ApiService.get("apps").then((res: any) => {
    data.value = res.data    
})
</script>
<template>
    <div class="grid grid-cols-4 gap-8">
        <div v-for="(app, i) in data">
            <AppCard :app="app"/>
        </div>
    </div>
</template>