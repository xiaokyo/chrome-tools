/** 郑温剑字符串 */
export const getUserName = `%E9%83%91%E6%B8%A9%E5%89%91`

/**
 * 获取时间段的数据
 * @param {string} username 用户名
 * @param {string} startDate 开始时间
 * @param {string} endDate 结束时间
 */
export const getDaySpendUrl = (username, startDate, endDate) => {
    let nowDate = new Date();
    let nowTime = nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate();
    return `https://www.tapd.cn/my_dashboard/single_member_job_detail?card_id=1141320568001000607&spent_begin=${startDate ?? nowTime}&spent_end=${endDate ?? nowTime}&selected_workspace=61438371|66473603&owner=${encodeURI(username)}`
}

/** 请求 */
export function request({
    method = "GET",
    url = '',
    success = (response) => { },
    header = {
        "Content-type": "application/json; utf-8"
    },
    data
}) {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    for (let key in header) {
        xhr.setRequestHeader(key, header[key])
    }
    xhr.onload = function () {
        success && success(this.response)
    }
    xhr.onerror = function (err) {
        console.error(err)
    }

    if (data) {
        xhr.send(data)
    } else {
        xhr.send()
    }
}

/**
 * 复制一段文本到剪贴板
 * @param {string} str 复制的文本
 */
export function copyText(str) {
    const input = document.createElement('div');
    input.setAttribute('contenteditable', "true")
    document.body.appendChild(input);
    input.innerText = str

    const range = document.createRange()
    range.selectNodeContents(input)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)

    if (document.execCommand('copy')) {
        document.execCommand('copy');
        // alert('复制成功:' + str);
        alert('复制成功:\n' + str)
    }
    document.body.removeChild(input);
}