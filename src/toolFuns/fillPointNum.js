import { request } from "@/common"
import { getUrlencodedData } from '@/utils'

export default () => {
  return new Promise(resolve => {
    const flag = confirm('确定规模在最后一列字段')
    if (!flag) return
    const tbody = document.querySelector('#story_list_content>tbody')
    let trs = tbody.querySelectorAll('tr')

    const totalPointNum = prompt('输入你要填入的功能点', 0)
    if (Number(totalPointNum) <= 0) return alert('你能不能认真填, 这可是绩效啊, 宝')

    let scaleSum = 0
    let arr = []
    // 累加规模总数
    trs.forEach((tr, i) => {
      if (i > 0) {
        const tds = tr.querySelectorAll('td')
        const lastTdElem = tds[tds.length - 1]
        console.log(tr.dataset.editableParams)
        arr.push({
          id: JSON.parse(tr.dataset.editableParams)['data[id]'],
          scale: Number(lastTdElem.dataset.editableValue),
          elem: lastTdElem.previousElementSibling
        })
        scaleSum += Number(lastTdElem.dataset.editableValue)
      }
    })

    // 算出规模每行比例
    let current = 0
    function run() {
      if (!arr[current]) {
        alert('处理完成')
        location.reload()
        resolve(true)
        return
      }
      const _ = arr[current]
      const ratio = _.scale / scaleSum
      const trPoint = Math.round(ratio * Number(totalPointNum))
      if (trPoint) {
        setTimeout(() => {
          requestPoint({
            id: _.id,
            value: trPoint,
            callback: function () {
              console.log(trPoint, _.elem)
              current += 1
              run()
            }
          })
        }, 200)
      }
    }
    run()
  })
}

/**
 * 
 *  {data[id]: 1166473603001135618
data[field]: custom_field_one
data[value]: 3} 
 */
function requestPoint({ id, value, callback }) {

  const data = getUrlencodedData({
    'data[id]': id,
    'data[field]': 'custom_field_one',
    'data[value]': value
  })

  request({
    method: 'POST',
    url: `https://www.tapd.cn/66473603/prong/stories/inline_update?r=${new Date().getTime()}`,
    header: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    data,
    success: callback
  })
}