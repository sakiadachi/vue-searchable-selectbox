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

export const fakeData: SearchItemType[] = [
  {
    key: 'a',
    searchText: '山田 太郎',
  },
  {
    key: 'b',
    searchText: 'hogeの介',
  },
]
