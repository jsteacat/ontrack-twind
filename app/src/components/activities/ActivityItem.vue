<script setup>
import BaseButton from '@/components/base/BaseButton.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { BUTTON_TYPE_DANGER } from '@/constants'
import { isActivityItemValid } from '@/validators'
import ActivitySecondsToComplete from '@/components/activities/ActivitySecondsToComplete.vue'
import { inject } from 'vue'

defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityItemValid
  }
})

const setActivitySecondsToComplete = inject('setActivitySecondsToComplete')
const deleteActivity = inject('deleteActivity')
const periodSelectOptions = inject('periodSelectOptions')
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteActivity(activity)">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        placeholder="hh:mm"
        :options="periodSelectOptions"
        :selected="activity.secondsToComplete || null"
        class="grow font-mono"
        @select="setActivitySecondsToComplete(activity, $event || 0)"
      />
      <ActivitySecondsToComplete v-if="activity.secondsToComplete" :activity="activity" />
    </div>
  </li>
</template>
