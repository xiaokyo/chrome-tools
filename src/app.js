import React, { useState } from "react";
import { copySpendReport } from "./toolFuns/getDaySpend";
import fillPointNum from './toolFuns/fillPointNum'
import ChangeTapdStatus from './toolFuns/change-tapd-status'

import s from "./global.css";

import Btn from './components/Button'
import Loading from "./components/Loading";
import useDrag from "./hooks/useDrag";

const App = () => {

  const [loading, setLoading] = useState(false)

  // 拖动
  useDrag('drag-box')

  const promiseLoadingFun = (fun) => {
    return async (...args) => {
      setLoading(true)
      await fun(...args)
      setLoading(false)
    }
  }

  const toolBtns = [
    {
      name: '获取日报',
      fun: copySpendReport,
    },
    {
      name: '指定日期日报',
      fun: copySpendReport,
      args: 'date'
    },
    {
      name: '填写功能点',
      fun: fillPointNum,
    },
    {
      name: '完成单子',
      fun: ChangeTapdStatus,
    },
    {
      name: '实现中单子',
      fun: ChangeTapdStatus,
      args: 'developing'
    }
  ]

  return (
    <>
      <div id="drag-box" className={s.main}>
        <div className={s.con}>
          {
            loading && <Loading />
          }
          {
            !loading && (
              <>
                插件
                <div className={s.container}>
                  <div className={s.box}>
                    {
                      toolBtns.map(_ => <Btn key={_.name} name={_.name} onClick={() => promiseLoadingFun(_.fun)(_.args)} />)
                    }
                  </div>
                </div>
              </>
            )
          }
        </div>
      </div>
    </>
  );
};

export default App