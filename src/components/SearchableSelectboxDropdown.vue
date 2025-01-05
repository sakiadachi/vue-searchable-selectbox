<script setup lang="ts">
import type { SearchItemType } from '../fakeData'

const emits = defineEmits<(e: 'clickItem', item: SearchItemType) => void>()

const props = defineProps<{
  results: SearchItemType[]
  selectedKeys: string[]
}>()

const isSelected = (key: string) => props.selectedKeys.includes(key)
</script>

<template>
  <div class="dropdown-outer">
    <div tabindex="0" v-show="props.results.length > 0">
      <template v-for="item in props.results" :key="item.key">
        <div
          @click="emits('clickItem', item)"
          class="row"
          :class="{ selected: isSelected(item.key) }"
        >
          <span v-if="isSelected(item.key)">✅</span>
          <span v-else>□</span>
          <span class="search-text">{{ item.searchText }}</span>
        </div>
      </template>
    </div>
    <p v-show="props.results.length === 0" class="no-results">No results</p>
  </div>
</template>

<style scoped>
.dropdown-outer {
  font-size: 1em;
  border: 1px solid black;
  border-radius: 0.25em;
  max-width: 80vw;
  min-width: 15em;
  background-color: white;
  max-height: 30em;
  min-height: 5em;
  overflow-y: auto;
}

.row {
  display: flex;
  padding: 0.5em;
  gap: 1em;
  transition: background-color 200ms;

  &.selected {
    background-color: rgba(255, 204, 0, 0.3);
  }

  &:focus,
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.search-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.no-results {
  text-align: center;
  width: 100%;
}

/* mobile */
@media screen and (max-width: 600px) {
  .dropdown-outer {
    max-width: 90vw;
  }
}
</style>
