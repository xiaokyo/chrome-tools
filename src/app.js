import React, { useState } from "react";

import s from "./global.css";
import { copySpendReport, getRemainAndTotalHour } from "./toolFuns/getDaySpend";
import { updateHandlePerson } from "./toolFuns/updateBillInfo";

export default () => {
  // const [isShow, setShow] = useState(false);

  return (
    <>
      <div className={s.main}>
        <div className={s.con}>
          插件
          <div className={s.container}>
            <div className={s.btn} onClick={() => copySpendReport()}>
              获取日报
          </div>

            <div className={s.btn} onClick={() => getRemainAndTotalHour()}>
              获取剩余工时和总工时
          </div>

            <div className={s.btn} onClick={() => updateHandlePerson()}>
              批量修改处理人(自用, 不知道的勿动，后果自负)
          </div>
          </div>
        </div>
      </div>
    </>
  );
};
