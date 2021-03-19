import React, { useState } from "react";
import Layer from "react-layui-layer";

import s from "./global.css";
import { copySpendReport } from "./toolFuns/getDaySpend";
import { updateHandlePerson } from "./toolFuns/updateBillInfo";

export default () => {
  const [isShow, setShow] = useState(false);

  return (
    <>
      <div className={s.main} onClick={() => setShow(true)}>
        插件
      </div>

      <Layer
        title="tapd tools"
        shade={0.3}
        width={"1000px"}
        visible={isShow}
        onCancel={() => setShow(false)}
      >
        <div className={s.container}>
          <div className={s.btn} onClick={() => copySpendReport()}>
            获取日报
          </div>
          <div className={s.btn} onClick={() => updateHandlePerson()}>
            批量修改处理人
          </div>
        </div>
      </Layer>
    </>
  );
};
