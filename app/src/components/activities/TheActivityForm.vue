<script setup>
import { nextTick, ref } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import { createActivity } from '@/useActivities'

const activity = ref('')

async function submit() {
  createActivity(activity.value)
  activity.value = ''
  await nextTick()
  window.scrollTo(0, -document.body.scrollHeight)
}
</script>

<template>
  <form class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4" @submit.prevent="submit">
    <input
      type="text"
      v-model="activity"
      class="w-full rounded border px-4 text-xl"
      placeholder="Activity name"
      @keyup.enter="submit"
    />
    <BaseButton :disabled="activity.trim() === ''">
      <PlusIcon class="h-8" />
    </BaseButton>
  </form>
</template>
