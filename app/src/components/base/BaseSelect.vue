<script setup>
import { computed } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { isSelectOptionsValid, isUndefinedOrNull } from '@/validators'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { BUTTON_TYPE_NEUTRAL } from '@/constants'

const props = defineProps({
  options: {
    type: Array,
    required: true,
    validator: isSelectOptionsValid
  },
  placeholder: {
    type: String,
    required: true
  },
  selected: {
    type: [Number, String]
  }
})

const emit = defineEmits({
  select: (value) => typeof value === 'number' || value === null
})

const isNotSelected = computed(() => isUndefinedOrNull(props.selected))
</script>

<template>
  <div class="flex gap-2">
    <BaseButton :type="BUTTON_TYPE_NEUTRAL" @click="emit('select', null)">
      <XMarkIcon class="h-8" />
    </BaseButton>
    <select
      name="base-select"
      class="w-full truncate rounded bg-gray-100 px-2 py-1 text-2xl"
      @change="emit('select', +$event.target.value)"
    >
      <option :selected="isNotSelected" disabled value="">
        {{ placeholder }}
      </option>
      <option
        v-for="{ value, label } in options"
        :key="value"
        :value="value"
        :selected="value === selected"
      >
        {{ label }}
      </option>
    </select>
  </div>
</template>
