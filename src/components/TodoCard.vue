<template>
    <div>
        <div
            class="w-full h-auto text-mainBlue font-medium bg-slate-100 rounded-lg shadow-lg flex flex-col items-start p-2">
            <div class="text-lg">
                {{ props.todo.name }}
            </div>
            <div class="text-xs flex justify-end w-full">
                {{ new Date(props.todo.createdAt).toLocaleDateString() }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ITodo } from '@/models/type';

// Consts & Props
interface IProps {
    todo: ITodo
}
const props = defineProps<IProps>()


</script>
