// https://www.tapd.cn/66473603/prong/stories/inline_update?r=1616127982711
// 项目id：66473603   // 地址栏workspace_id=66473603
// 13位时间戳：1616057289086  // new Date().getTime()

// headers
// Content-Type: application/x-www-form-urlencoded; charset=UTF-8

// 参数
// data[id]: 1166473603001083741
// data[type]: story
// data[field]: owner
// data[value]: 郑温剑;

import { request } from "@/common";
import { getUrlencodedData } from '@/utils'

/**
 * 强制修改单子内部信息
 * @param {object} param0 一些参数
 */
export const updateBillInfo = ({ billId, key, value, type, work_space_id }) => {
  const data = getUrlencodedData({
    "data[id]": billId,
    "data[type]": type,
    "data[field]": key,
    "data[value]": value,
  });

  const work_id = work_space_id ?? "66473603"; // 默认cjDropshipping

  request({
    method: "POST",
    url: `https://www.tapd.cn/${work_id}/prong/stories/inline_update?r=${new Date().getTime()}`,
    header: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    data,
    success: (res) => {
      console.log("res", res);
    },
  });
};

/**
 * 修改处理人
 */
export const updateHandlePerson = () => {
  const oldPerson = prompt("原处理人", "郑温剑");
  if (!oldPerson) return alert("请输入原处理人");
  const newPerson = prompt("新处理人", "郑温剑");
  if (!newPerson) return alert("请输入处理人");

  const paths = location.pathname.split('/')
  const iterationId = paths[paths.length - 1]

  const tbody = document.querySelector(`table#${oldPerson}_${iterationId}_items tbody`);
  const trs = tbody.querySelectorAll("tr");

  trs.forEach((tr) => {
    // 郑温剑_story_1166473603001087796
    const idAttrVal = tr.getAttribute('id').split('_')
    const rowId = idAttrVal[idAttrVal.length - 1];
    const rowType = tr.getAttribute("type");
    const ownerTd = document.getElementById(`${oldPerson}_${rowId}owner`); // 郑温剑_1166473603001087796owner
    const status = document.getElementById(`${oldPerson}_${rowType}_status_${rowId}`).getAttribute('title') // 郑温剑_story_status_1166473603001087796
    // data-editable-value="戚小龙smalldragon;"
    const oldOwner = ownerTd.getAttribute("data-editable-value");

    if (oldOwner.indexOf(oldPerson) > -1 && status !== '已实现') {
      console.log('所有人', rowId, oldOwner, status)
      // 改成我的
      updateBillInfo({
        billId: rowId,
        type: rowType,
        key: "owner",
        value: newPerson,
      });
    }
  });
};
