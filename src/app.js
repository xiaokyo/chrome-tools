import React, { useState } from "react";
import { copySpendReport } from "./toolFuns/getDaySpend";
import fillPointNum from './toolFuns/fillPointNum'

import s from "./global.css";

import Btn from './components/Button'
import Loading from "./components/Loading";

const App = () => {

  const [loading, setLoading] = useState(false)

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
    }
  ]

  return (
    <>
      <div className={s.main}>
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