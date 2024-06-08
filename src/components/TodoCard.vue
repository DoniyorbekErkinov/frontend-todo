<template>
    <div>
        <div
            class="w-full h-[80px] text-mainBlue font-medium bg-slate-100 rounded-lg shadow-lg flex flex-col items-start p-2">
           
            <div class="text-2xl">
                {{ props.todo.name }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ITodo } from '@/models/type';
import { Share3Icon, EditCircleIcon } from 'vue-tabler-icons';
import { useRouter } from 'vue-router';
// Consts & Props
interface IProps {
    todo: ITodo
}
const router = useRouter()
const props = defineProps<IProps>()
</script>