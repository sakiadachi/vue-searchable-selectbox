<script setup lang="ts">
import SeachableSelectboxInput from './SeachableSelectboxInput.vue'
import { fakeData, type SearchItemType } from '../fakeData'
import { useSearch } from '../composables/useSearch'
import { useDropdown } from '../composables/useDropdown'
import { useDebounce } from '../composables/useDebounce'
import { ref, watch } from 'vue'
import SearchableSelectboxDropdown from './SearchableSelectboxDropdown.vue'

const selectedModel = defineModel<SearchItemType[]>('selectedModel', {
  required: true,
})

const props = withDefaults(
  defineProps<{
    items: SearchItemType[]
    label?: string
  }>(),
  {
    items: () => fakeData,
  },
)

const { isVisible, selectedKeys, selectedItems, showDropdown, hideDropdown, onClickItem } =
  useDropdown(props.items)

const { text, results, clearText } = useSearch(props.items)

const selectboxRef = ref<HTMLDivElement>()

watch(
  () => selectedItems.value,
  (value) => {
    selectedModel.value = value
  },
)

const onFocusOut = () => useDebounce(hideDropdown, 200)
</script>

<template>
  <div class="searchable-selectbox">
    <SeachableSelectboxInput
      ref="selectboxRef"
      v-model="text"
      :label="props.label"
      @clear="clearText"
      @on-focus="showDropdown"
      @on-focus-out="onFocusOut"
      @on-click="showDropdown"
    />
    <SearchableSelectboxDropdown
      v-show="isVisible"
      :results="results"
      :selectedKeys="selectedKeys"
      @click-item="onClickItem"
      class="dropdown"
    />
  </div>
</template>

<style scoped>
.searchable-selectbox {
  position: relative;
}

.dropdown {
  position: absolute;
}
</style>
