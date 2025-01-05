import { computed, ref, watch } from 'vue'
import type { SearchItemType } from '../fakeData'
import { useDebounce } from './useDebounce'

export const useSearch = (searchItems: SearchItemType[]) => {
  const inputText = ref('')

  /**
   * text to search items
   */
  const searchText = ref('')

  const results = computed(() => {
    if (searchText.value === '') {
      return searchItems
    }
    const split = searchText.value
      .trim()
      .split(/,| |, /)
      .filter((v) => v.length > 0)

    return searchItems
      .map((item) => {
        const regex = new RegExp(split.join('|'))
        if (item.searchText.match(regex)) {
          return item
        }
      })
      .filter((_) => _ != null)
  })

  const clearInputText = () => {
    inputText.value = ''
  }

  watch(
    () => inputText.value,
    (value) =>
      useDebounce(() => {
        searchText.value = value
      }, 250),
  )

  return {
    text: inputText,
    results,
    clearText: clearInputText,
  }
}
