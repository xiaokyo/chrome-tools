import React, { useEffect, useState } from "react";
import Layer from "react-layui-layer";

import s from "./global.css";
import { copySpendReport } from "./toolFuns/getDaySpend";

export default () => {
  const [isShow, setShow] = useState(false);

  useEffect(() => {
    const queryUrl = location.href;
    const reportUrl = sessionStorage.getItem("spendReportUrl");

    if (queryUrl === reportUrl) {
      setShow(true);
    }
  }, []);

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
        </div>
      </Layer>
    </>
  );
};
