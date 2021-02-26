console.log('load tapd tools')

function addScript(url, cb) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', url);
    script.onload = function () {
        cb()
    }

    document.getElementsByTagName('head')[0].appendChild(script);
}

$('body').append(`<style type="text/css">
    tr.rowNOTdone .list-action-inner .dropdown-operation .dropdown {
        display:block!important;
    }
    tr.rowNOTdone .dropdown-menu {
        display: block!important;
        left: 0;
        top: -8px;
    }
    </style>`);

function request({
    method = "GET",
    url = '',
    success = (response) => { },
    header = {},
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


function getCopyText(type = "1", url) {
    request({
        method: "GET",
        url,
        success: (res) => {
            const content = res
            const text = subStringWant(content, 'id="title-copy-btn" data-clipboard-text="', '" href="#" title="复制标题与链接"')
            const svnText = subStringWant(content, '<li id="svn_keyword" class="clipboard-btn" data-clipboard-text="', ' {#_orginal_url#}">')
            if (type == 1) {
                // 复制标题及链接
                copyText(text)
            } else if (type == 2) {
                // 复制提交信息
                const xmId = subStringWant(url, "https://www.tapd.cn/", "/prong")
                const requestShortUrl = `https://www.tapd.cn/${xmId}/short_url/generate_short_url/`
                request({
                    method: "POST",
                    url: requestShortUrl,
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    },
                    data: `orginal_long_url=${encodeURIComponent(url)}`,
                    success: res => {
                        console.log('svn', svnText + ' ' + res)
                        copyText(svnText + ' ' + res)
                    }
                })
            }
        }
    })
}

/**
 * 复制一段文本到剪贴板
 * @param {string} str 复制的文本
 */
function copyText(str) {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', str);
    input.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        alert('复制成功:' + str);
    }
    document.body.removeChild(input);
}

/**
 * 复制两端中间的值
 * @param {*} content html 原文
 * @param {*} beforeStr id="title-copy-btn" data-clipboard-text="
 * @param {*} afterStr  href="#" title="复制标题与链接"
 */
function subStringWant(content, beforeStr, afterStr) {
    const bLen = beforeStr.length;
    const aLen = afterStr.length;
    let result = ''
    result = content.substring(content.indexOf(beforeStr) + bLen, content.indexOf(afterStr))
    return result
}

let isStart = false;
function removeAll() {
    $(".copy-text-name").remove();
    $(".copy-svn-name").remove();
}

function setAllCopyBtn() {
    $('#story-worktable-list').find('tr').each(function () {
        const $elem = $(this)
        const $title = $elem.find(".preview-title")
        const $titleParent = $title.parent()
        const href = $title.attr('href')
        if (!href) return;
        const offset = $title.offset();
        const w = $titleParent.width();
        console.log($elem, href, offset)
        const copyTitle = document.createElement('div')
        copyTitle.className = 'copy-text-name'
        copyTitle.innerText = "复制标题"
        copyTitle.style.cssText = `box-shadow: 0 0 4px #ccc;box-sizing:border-box;position:absolute;left:${offset.left + w + 8}px;top:${offset.top - 6}px;background-color:#000;color:#fff;padding:8px 15px;z-index:999;cursor:pointer;`;
        copyTitle.onclick = function () {
            // axios.get('')
            getCopyText(1, href)
        }
        $("body").append(copyTitle)

        const copyTitleRect = copyTitle.getBoundingClientRect()

        const copySVN = document.createElement('div')
        copySVN.className = 'copy-svn-name'
        copySVN.innerText = "复制SVN"
        copySVN.style.cssText = `box-shadow: 0 0 4px #ccc;box-sizing:border-box;position:absolute;left:${offset.left + w + copyTitleRect.width + 16}px;top:${offset.top - 6}px;background-color:#000;color:#fff;padding:8px 15px;z-index:999;cursor:pointer;`;
        copySVN.onclick = function () {
            // axios.get('')
            getCopyText(2, href)
        }
        $("body").append(copySVN)
    })
}

// 工具启动器
const toolsBox = document.createElement('div')
toolsBox.style.cssText = 'position:fixed;left:0;bottom:0;z-index:1001; width:100%;background-color:black;color:#fff;padding:8px 15px;';

/**
 * 创建按钮
 * @param {string} title 按钮标题
 * @param {Function} onclick 点击事件
 */
function createButton(title, onclick) {
    const btn = document.createElement('button')
    btn.style.cssText = `margin-right:8px;margin-bottom:8px;`
    btn.setAttribute('type', 'button')
    btn.innerText = title
    btn.onclick = onclick
    toolsBox.append(btn)
}

// 隐藏显示复制
createButton('切换复制功能', function () {
    if (isStart) {
        removeAll()
        isStart = false
        return;
    }

    setAllCopyBtn()
    isStart = true
})

/** 获取时间或几天前或几天后的日期 */
function fun_date(a) {
    var date1 = new Date(),
        time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + a);
    var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
    return {
        time1,
        time2
    }
}
createButton('展示最近7天工时表', function () {
    const time = fun_date(-7)
    window.layer.open({
        type: 2,
        title: '最近7天工时表',
        shadeClose: true,
        shade: 0.8,
        area: ['90%', '90%'],
        content: `https://www.tapd.cn/my_dashboard/single_member_job_detail?card_id=1141320568001000607&spent_begin=${time.time2}&spent_end=${time.time1}&selected_workspace=48034556|51741031|61438371|66473603|67366910&owner=%E9%83%91%E6%B8%A9%E5%89%91` //iframe的url
    });
})


$('body').append(toolsBox)