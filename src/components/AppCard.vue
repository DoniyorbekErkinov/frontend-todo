<template>
    <div>
        <div
            class="w-full min-w-[300px] h-[80px] text-mainBlue font-medium bg-slate-100 rounded-lg shadow-lg flex flex-col items-start p-2">
            <div class="flex items-center justify-end w-full ">
                <Share3Icon @click="openInNewTab" class="cursor-pointer shadow-md rounded-full p-1 bg-white mr-2" />
                <EditCircleIcon @click="EditApp" class="cursor-pointer shadow-md rounded-full p-1 bg-white mr-2" />
                <DownloadIcon @click="emits('downloadJSON', props.app)" class="cursor-pointer shadow-md rounded-full p-1 bg-white" />
            </div>
            <div class="text-2xl">
                {{ props.app.name }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { IApp } from '@/models/type';
import { Share3Icon, EditCircleIcon, DownloadIcon } from 'vue-tabler-icons';
import { useRouter } from 'vue-router';
// Consts & Props
interface IProps {
    app: IApp
}
const router = useRouter()
const props = defineProps<IProps>()
const emits = defineEmits(["edit", "downloadJSON"])

const openInNewTab = () => {
    const routeData = router.resolve({ name: 'AppPage', params: { appId: props.app.id }, query: {name: props.app.name.replace(" ", "_")} });
    window.open(routeData.href, '_blank');
}

const EditApp = () => {
    emits("edit", props.app)
}
</script>