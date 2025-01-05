import { ref } from 'vue'

type Callback = <T>(...args: T[]) => void

/**
 * timeout ID
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout#return_value
 */
const timeoutId = ref<number>()

/**
 * Delay the execution of function
 * It rejects executing callback if a Promise before is not fulfilled.
 */
export const useDebounce = (callback: Callback, ms: number): Promise<void> =>
  new Promise((resolve, reject) =>
    new Promise((resolve, reject) => {
      if (typeof timeoutId.value === 'number') {
        reject()
      }
      clearTimeout(timeoutId.value)
      timeoutId.value = setTimeout(() => resolve(callback()), ms)
    })
      .then(() => resolve)
      .catch(() => reject),
  )
