<script>
export default {
  inheritAttrs: false
}
</script>

<template>
  <li class="flex-1" :class="[{ 'pointer-events-none bg-gray-200': false }]">
    <a v-bind="$attrs" class="flex flex-col items-center p-2 text-xs capitalize">
      <slot />
    </a>
  </li>
</template>
