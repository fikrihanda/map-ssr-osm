<script lang="ts" setup>
import { VBtn } from 'vuetify/components'

withDefaults(
  defineProps<{
    text: string
  }>(),
  {
    text: '',
  },
)
const emits = defineEmits(['toClick'])

const cc = function (e: MouseEvent) {
  e.preventDefault()
  emits('toClick')
}
</script>

<template>
  <div>
    <div class="pb-2">
      {{ text }}
    </div>
    <div class="text-center">
      <a href="#" @click.prevent="cc">
        Click Here
      </a>
    </div>
  </div>
</template>
