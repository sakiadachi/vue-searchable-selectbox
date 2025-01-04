<script setup lang="ts">
import Selectbox from './Selectbox.vue'
import Dropdown from './Dropdown.vue'
import { fakeData } from '../fakeData'
import { useSearch } from '../composables/useSearch'
import { useDropdown } from '../composables/useDropdown'
import { useDebounce } from '../composables/useDebounce'

const props = defineProps<{
  label?: string
}>()

const { isVisible, selectedItems, showDropdown, hideDropdown, onClickItem } = useDropdown(fakeData)
const { text, results, clearText } = useSearch(fakeData)

const onFocusOut = () => useDebounce(hideDropdown, 200)
</script>

<template>
  <div class="searchable-selectbox">
    <Selectbox
      ref="selectboxRef"
      v-model="text"
      :label="props.label"
      @clear="clearText"
      @on-focus="showDropdown"
      @on-focus-out="onFocusOut"
      @on-click="showDropdown"
    />
    <Dropdown v-show="isVisible" :results="results" @click-item="onClickItem" class="dropdown" />
  </div>
  <p>{{ selectedItems }}</p>
</template>

<style scoped>
.searchable-selectbox {
  position: relative;
}

.dropdown {
  position: absolute;
}
</style>
