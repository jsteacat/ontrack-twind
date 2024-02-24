<script setup>
import { currentPage, navigate } from '@/useRouter'
import { isNavItemValid } from '@/validators'
import { computed } from 'vue'

const props = defineProps({
  navItem: {
    type: Object,
    required: true,
    validator: isNavItemValid
  }
})

const classes = computed(() => [
  'flex flex-col items-center p-2 text-xs capitalize',
  { 'pointer-events-none bg-gray-200': currentPage.value === props.navItem.page }
])
</script>

<template>
  <li class="flex-1" :class="[{ 'pointer-events-none bg-gray-200': false }]">
    <a :href="`#${navItem.page}`" :class="classes" @click="navigate(navItem.page)">
      <Component :is="navItem.icon" class="h-6 w-6" /> {{ navItem.page }}
    </a>
  </li>
</template>
