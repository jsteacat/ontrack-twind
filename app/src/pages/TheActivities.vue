<script setup>
import BaseButton from '@/components/base/BaseButton.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import { TrashIcon } from '@heroicons/vue/24/outline'

const periodSelectOptions = [
  {
    value: 15,
    label: '0:15'
  },
  {
    value: 30,
    label: '0:30'
  },
  {
    value: 45,
    label: '0:45'
  }
]

const activities = ['Coding', 'Reding', 'Training']
</script>

<template>
  <div>
    <ul class="divide-y">
      <li v-for="activity in activities" :key="activity" class="flex flex-col gap-2 p-4">
        <div class="flex items-center gap-2">
          <BaseButton>
            <TrashIcon class="h-8" />
          </BaseButton>
          <span class="truncate text-xl">Reading</span>
        </div>
        <div>
          <BaseSelect placeholder="h:mm" :options="periodSelectOptions" class="font-mono" />
        </div>
      </li>
    </ul>
  </div>
</template>
