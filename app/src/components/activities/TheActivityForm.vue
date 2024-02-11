<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import { isActivityItemValid } from '@/validators'

const emit = defineEmits({
  submit: isActivityItemValid
})

const activity = ref('')

function submit() {
  emit('submit', activity.value)
  activity.value = ''
}
</script>

<template>
  <form class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4" @submit.prevent="submit">
    <input
      type="text"
      v-model="activity"
      class="w-full rounded border px-4 text-xl"
      placeholder="Activity name"
    />
    <BaseButton :disabled="activity.trim() === ''">
      <PlusIcon class="h-8" />
    </BaseButton>
  </form>
</template>
