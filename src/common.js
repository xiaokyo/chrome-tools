/**
 * 获取用户名
 * @returns 登陆的用户名
 */
export const getCurrentLoginName = () => {
  let result = ''
  const usernameDom = document.getElementsByClassName("avatar-text-default")[0];
  if (usernameDom) {
    result = usernameDom.getAttribute("title");
  }
  if (!result) throw new Error('未登录')
  return result
}

/**
 * 返回当前时间
 * @returns  2020-10-05
 */
export const getDateToString = () => {
  let nowDate = new Date();
  let nowTime =
    nowDate.getFullYear() +
    "-" +
    (nowDate.getMonth() + 1) +
    "-" +
    nowDate.getDate();
  return nowTime;
};

/**
 * 获取时间段的数据
 * @param {string} username 用户名
 * @param {string} startDate 开始时间
 * @param {string} endDate 结束时间
 */
export const getDaySpendUrl = (username, startDate, endDate) => {
  const nowTime = getDateToString();
  return `https://www.tapd.cn/my_dashboard/single_member_job_detail?card_id=1141320568001000607&spent_begin=${startDate ?? nowTime
    }&spent_end=${endDate ?? nowTime
    }&selected_workspace=61438371|66473603&owner=${encodeURI(username)}`;
};

/** 请求 */
export function request({
  method = "GET",
  url = "",
  success = () => { },
  header = {
    "Content-type": "application/json; utf-8",
  },
  data,
}) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  for (let key in header) {
    xhr.setRequestHeader(key, header[key]);
  }
  xhr.onload = function () {
    success && success(this.response);
  };
  xhr.onerror = function (err) {
    console.error(err);
  };

  if (data) {
    xhr.send(data);
  } else {
    xhr.send();
  }
}

/**
 * 复制一段文本到剪贴板
 * @param {string} str 复制的文本
 */
export function copyText(str) {
  navigator.clipboard.writeText(str).then(() => alert(str)).catch((err) => alert('err:', err))
}
