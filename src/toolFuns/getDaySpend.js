import { copyText, getDaySpendUrl, getDateToString, request, getCurrentLoginName } from "@/common";
import cheerio from 'cheerio';
import store from '@/utils/store'

/**
 * 复制花费报告
 * @returns
 */
export const copySpendReport = ({ type = 'today', isCopy = true } = {}) => {
  return new Promise(resolve => {
    const username = getCurrentLoginName()
    let startDate = getDateToString()
    let endDate = startDate
    if (type == 'date') {
      startDate = prompt("开始时间", startDate);
      endDate = prompt("结束时间", startDate);
    }
    const url = getDaySpendUrl(username, startDate, endDate);
    request({
      method: "GET",
      url,
      success: (content) => {
        clickCopySpendReport(content, isCopy, function(res) {
          resolve(res, content)
        })
      }
    })
  })
};

/**
 * 处理用户点击copy
 * @returns
 */
export const clickCopySpendReport = (copyContent, isCopy, cb) => {
  console.log('run copy')
  if (!copyContent) {
    return
  }
  let content = copyContent
  const $ = cheerio.load(content);
  const tbody = $('tbody').eq(0)
  const trs = $(tbody).find('tr')
  if (trs?.length <= 0) return;
  let tables = [];
  // 循环获取标题及链接
  for (let i = 0; i < trs.length; i++) {
    const tr = trs[i];
    const tds = $(tr).find("td");
    const aInfoIndex = i === 0 ? 2 : 0; // 级联效果第二行开始就是td数量会少位置会变
    const aInfo = $(tds[aInfoIndex]).find("a").eq(0);

    if (!!aInfo) {
      // tapd link
      const link = aInfo.attr("href");
      // tapd 标题
      const title = aInfo.attr("title");
      // 花费
      const spendIndex = i === 0 ? 4 : 2; // 级联效果第二行开始就是td数量会少位置会变
      const spend = $(tds[spendIndex])?.text().trim();
      if (Number(spend) > 0) {
        tables.push({
          title,
          link,
          spend,
        });
      }
    }
  }
  let daySpendText = ``, sumSpend = 0;
  tables.forEach((item, index) => {
    daySpendText += `${index > 0 ? "\r\n" : ""}${index + 1}.【${item.title}】 ${item.link
      } 花费${item.spend} \r\n`;
    sumSpend += Number(item.spend)
  });

  const spendContent = `总花费: ${sumSpend}\r\n${daySpendText}`
  if (isCopy)
    copyText(spendContent);
  cb?.(spendContent)
}

/**
 * 获取剩余规模和总规模和完成率
 */
export const getRemainAndTotalHour = () => {
  let remainUrl = store.get('remainUrl') ?? ''
  if (remainUrl.indexOf('http') === -1) remainUrl = prompt("剩余工时链接", '')

  let totalUrl = store.get('totalUrl') ?? ''
  if (totalUrl.indexOf('http') === -1) totalUrl = prompt("总工时链接", '')

  store.set({
    remainUrl,
    totalUrl
  })

  const getNumByNode = (content) => {
    const $ = cheerio.load(content)
    const totalElem = $('.total').eq(0)
    const tdElem = totalElem.find('td').eq(2)
    return tdElem.text()
  }

  request({
    method: "GET",
    url: remainUrl,
    success: (remainContent) => {
      const remainText = getNumByNode(remainContent)
      request({
        method: "GET",
        url: totalUrl,
        success: (totalContent) => {
          const totalText = getNumByNode(totalContent)

          let percentage = Number(totalText) - Number(remainText)
          percentage = percentage / Number(totalText)
          percentage = Number(percentage).toFixed(2)
          percentage = `${percentage}%`.replace(/0\./, '')
          console.log(remainText, totalText, percentage)

          copyText(`剩余规模：${remainText}  总规模：${totalText}  完成率：${percentage}`)
        }
      })

    }
  })
}