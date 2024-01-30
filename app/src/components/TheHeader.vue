<script setup>
import TheLogo from './TheLogo.vue'
import TheHeaderProgress from './TheHeaderProgress.vue'
import { PAGE_TIMELINE, PAGE_PROGRESS } from '@/constants'

const emit = defineEmits('updateCurrentPage')
</script>

<template>
  <header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-3">
    <TheLogo @click="emit('updateCurrentPage', PAGE_TIMELINE)" />
    <TheHeaderProgress @click="emit('updateCurrentPage', PAGE_PROGRESS)" />
  </header>
</template>
