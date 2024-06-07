<template>
    <div>
        <router-link :to="{ name: 'AppPage', params: {appId: props.app.id}}" target="_blank" class="w-[250px] h-[80px] text-mainBlue font-medium bg-slate-100 rounded-lg shadow-lg flex justify-start items-center p-2 cursor-pointer">
            {{ props.app.name }}
        </router-link>
    </div>
</template>
<script setup lang="ts">
import { IApp } from '@/models/type';

interface IProps {
    app: IApp
}
const props = defineProps<IProps>()
</script>