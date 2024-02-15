<script setup>
import BaseButton from '@/components/base/BaseButton.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { PERIOD_SELECT_OPTIONS, BUTTON_TYPE_DANGER } from '@/constants'
import { isActivityItemValid, isNumber, isUndefined } from '@/validators'

defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityItemValid
  }
})

const emit = defineEmits({
  delete: isUndefined,
  setSecondsToComplete: isNumber
})
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="emit('delete')">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div>
      <BaseSelect
        placeholder="hh:mm"
        :options="PERIOD_SELECT_OPTIONS"
        :selected="activity.secondsToComplete || null"
        class="font-mono"
        @select="emit('setSecondsToComplete', $event || 0)"
      />
    </div>
  </li>
</template>
