/**
 * 修改状态接口
 * https://www.tapd.cn/66473603/prong/stories/change_story_status/1166473603001175505/storieslist/db
 */

import { getCurrentLoginName, request } from "@/common";
import { getUrlencodedData } from "@/utils";
import cheerio from "cheerio";

export default (status = "resolved") => {
  return new Promise((resolve) => {
    const $ = cheerio.load(document.body.innerHTML);
    const $trs = $("#story_list_content>tbody>tr");
    const list = [];
    $trs.each(function (i, e) {
      if (i == 0) return; // 过滤第一个tr, 它是快速创建

      const id = $(e).attr("story_id");
      const checked = $(e).hasClass("checked-tr");
      if (checked) {
        list.push(id);
      }
    });

    let count = 0;
    function run() {
      if (count >= list.length) {
        alert("处理完成");
        resolve(true);
        location.reload();
        return;
      }

      setTimeout(() => {
        ApiChangeTapdStatus({
          id: list[count],
          status,
          callback() {
            count += 1;
            run();
          },
        });
      }, 1000);
    }
    run();
  });
};

const ApiChangeTapdStatus = ({ id, status = "resolved", callback }) => {
  const username = getCurrentLoginName();
  const data = getUrlencodedData({
    "data[Story][current_status]": "planning",
    "data[new_status]": status,
    "data[STATUS_developing-developing][owner]": username,
    "data[STATUS_developing-rejected][owner]": username,
    "data[STATUS_developing-resolved][owner]": username,
    "data[editor]": "",
    "data[Comment][description]": "",
  });

  request({
    method: "POST",
    url: `https://www.tapd.cn/66473603/prong/stories/change_story_status/${id}/storieslist/db`,
    header: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    data,
    success: callback,
  });
};
