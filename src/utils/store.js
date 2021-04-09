/**
 * @description localStorage 操作
 */

import serialize from 'serialize-javascript'

/** tapd storage 键值 */
export const STORE_NAME = '@tapd-tools/handle'

/** 反序列化 */
const deSerialize = (content) => {
  return eval('(' + content + ')')
}

const Store = {
  getAll: () => {
    const val = localStorage.getItem(STORE_NAME) || '{}'
    return deSerialize(val)
  },
  get: (key) => {
    const val = Store.getAll()
    return val[key]
  },
  set: (obj) => {
    let _val = Store.getAll()
    _val = Object.assign({}, _val, obj)
    const newVal = serialize(_val)
    localStorage.setItem(STORE_NAME, newVal)
  },
  remove: (key) => {
    Store.set({ key, undefined })
  },
  clear: () => {
    localStorage.removeItem(STORE_NAME)
  }
}

export default Store