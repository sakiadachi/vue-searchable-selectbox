import { computed, ref } from 'vue'
import type { SearchItemType } from '../fakeData'

export const useDropdown = (searchItems: SearchItemType[]) => {
  const isVisible = ref(false)

  const selectedKeys = ref<string[]>([])

  const selectedItems = computed(() =>
    searchItems.filter((item) => selectedKeys.value.includes(item.key)),
  )

  const showDropdown = () => {
    isVisible.value = true
  }
  const hideDropdown = () => {
    isVisible.value = false
  }

  const onClickItem = (item: SearchItemType) => {
    if (selectedKeys.value.includes(item.key)) {
      selectedKeys.value = selectedKeys.value.filter((_) => _ !== item.key)
    } else {
      selectedKeys.value = [...selectedKeys.value, item.key]
    }
  }

  return {
    isVisible,
    selectedKeys,
    selectedItems,
    showDropdown,
    hideDropdown,
    onClickItem,
  }
}
