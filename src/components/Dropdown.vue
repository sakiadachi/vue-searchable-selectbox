<script setup lang="ts">
import type { SearchItemType } from '../fakeData'

const emits = defineEmits<{
  (e: 'clickItem', item: string): void
}>()

const props = defineProps<{
  results: SearchItemType[]
}>()
</script>

<template>
  <div>
    <div v-show="props.results.length > 0" class="dropdown-outer">
      <template v-for="item in props.results" :key="item.key">
        <div @click="emits('clickItem', item.key)" class="row">{{ item.searchText }}</div>
      </template>
    </div>
    <p v-show="props.results.length === 0">No results</p>
  </div>
</template>

<style scoped>
.dropdown-outer {
  font-size: 1em;
  border: 1px solid black;
  border-radius: 0.25em;
  width: 30vw;
  background-color: white;
}

.row {
  display: flex;
  padding: 0.5em;
  transition: background-color 200ms;

  &:focus,
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

/* mobile */
@media screen and (max-width: 600px) {
  .dropdown-outer {
    width: 90vw;
  }
}
</style>
