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

  const onClickItem = (newKey: string) => {
    if (selectedKeys.value.includes(newKey)) {
      selectedKeys.value = selectedKeys.value.filter((_) => _ !== newKey)
    } else {
      selectedKeys.value = [...selectedKeys.value, newKey]
    }
    hideDropdown()
  }

  return {
    isVisible,
    selectedItems,
    showDropdown,
    hideDropdown,
    onClickItem,
  }
}
