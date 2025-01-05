export type SearchItemType = {
  /**
   * key of item
   */
  key: string
  /**
   * string to search
   */
  searchText: string
}

export const fakeData: SearchItemType[] = Array.from({ length: 100 }, (_, i) => ({
  key: `${i}-item-key`,
  searchText: `${i} ${Math.random()}`,
}))
