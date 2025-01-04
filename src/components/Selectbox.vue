<script setup lang="ts">
import { ref } from 'vue'

const model = defineModel<string>({ required: true })

const emits = defineEmits<{
  (e: 'clear'): void
  (e: 'onFocus'): void
  (e: 'onFocusOut'): void
  (e: 'onClick'): void
}>()

const props = defineProps<{
  label?: string
}>()

const inputRef = ref<HTMLInputElement>()
</script>

<template>
  <div class="outer">
    <label for="searchInput">{{ props.label }}</label>
    <div class="selectbox">
      <input
        ref="inputRef"
        v-model="model"
        type="text"
        id="searchInput"
        @focus="emits('onFocus')"
        @focusout="emits('onFocusOut')"
        @click="emits('onClick')"
      />
      <button @click="emits('clear')" aria-label="Clear search text button">✖️</button>
    </div>
  </div>
</template>

<style scoped>
.outer {
  display: flex;
  flex-direction: column;
  font-size: 1em;
}

.selectbox {
  display: flex;
  gap: 0.5em;
}
</style>
