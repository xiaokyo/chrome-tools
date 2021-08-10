import React from "react";
import { copySpendReport } from "./toolFuns/getDaySpend";
import fillPointNum from './toolFuns/fillPointNum'

import s from "./global.css";

const Btn = ({
  name = '',
  ...props
}) => (
  <div className={s.btn} {...props}>
    {name}
  </div>
)

const App = () => {

  return (
    <>
      <div className={s.main}>
        <div className={s.con}>
          插件
          <div className={s.container}>
            <div className={s.box}>
              <Btn name="获取日报" onClick={() => copySpendReport()} />
              <Btn name="填写功能点" onClick={fillPointNum}></Btn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App