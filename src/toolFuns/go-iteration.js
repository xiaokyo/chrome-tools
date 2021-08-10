import Store from "@/utils/store"
import { ch2Unicode } from "@/utils/unicode"

const ITERATION_KEY = 'left_iteration_list'
const ITERATION_FILTER_KEY = 'left_iteration_list_filter'

export const goIteration = () => {
  const name = prompt('输入迭代名称', '')
  if (!name) return alert('能不能输入迭代名呢, 宝')
  let filters = Store.get(ITERATION_FILTER_KEY) ?? []
  filters = filters.filter(_ => _ !== name)
  filters.push(name)
  Store.set({ [ITERATION_FILTER_KEY]: filters })

  setCookieIterationFilter(ITERATION_FILTER_KEY, { "name": name, "creator": "", "startdate": { "begin": "", "end": "" }, "enddate": { "begin": "", "end": "" }, "status": ["open", "done"], "custom_field_2": [""] })

  setCookieIterationFilter(ITERATION_KEY, { "workspace_id": "66473603", "and": { "name": `LIKE+%${name}%`, "0": { "or": [{ "status": "open" }] } } })
  location.href = `https://www.tapd.cn/66473603/prong/iterations/card_view`
}

const setCookieIterationFilter = (key, text) => {
  let val = text
  val = JSON.stringify(val)
  val = ch2Unicode(val)
  val = encodeURIComponent(val)
  document.cookie = `${key}=${val}; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/66473603/prong/iterations`;

}