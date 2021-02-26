import { copyText, getDaySpendUrl } from "../common"

export const getDateSpend = () => {
    const queryUrl = location.href

    const usernameDom = document.getElementsByClassName('avatar-text-default')[0]
    if (!usernameDom) return alert('你未登录')
    const username = usernameDom.getAttribute('title')
    const url = getDaySpendUrl(username);

    // 先跳到指定页面在取数据
    if (queryUrl !== url) return location.href = url

    const tbody = document.getElementsByTagName('tbody')[0]
    const trs = tbody.getElementsByTagName('tr')
    if (trs?.length <= 0) return
    let tables = []
    // 循环获取标题及链接
    for (let i = 0; i < trs.length; i++) {
        const tr = trs[i]
        const tds = tr.getElementsByTagName('td')
        const aInfoIndex = i === 0 ? 2 : 0 // 级联效果第二行开始就是td数量会少位置会变
        const aInfo = tds[aInfoIndex]?.getElementsByTagName('a')[0]
        if (aInfo) {
            // tapd link
            const link = aInfo.getAttribute('href')
            // tapd 标题
            const title = aInfo.getAttribute('title')
            // 花费
            const spendIndex = i === 0 ? 4 : 2 // 级联效果第二行开始就是td数量会少位置会变
            const spend = tds[spendIndex]?.innerText

            if (Number(spend) > 0) {
                tables.push({
                    title,
                    link,
                    spend
                })
            }
        }
    }

    console.log('tables', tables)
    let daySpendText = ``
    tables.forEach((item, index) => {
        daySpendText += `${index > 0 ? '\r\n' : ''}${index + 1}.【${item.title}】 ${item.link} 花费${item.spend} \r\n`
    })

    copyText(daySpendText)
}