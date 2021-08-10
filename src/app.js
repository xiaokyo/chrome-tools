import React, { useState } from "react";
import { copySpendReport } from "./toolFuns/getDaySpend";
import fillPointNum from './toolFuns/fillPointNum'

import s from "./global.css";

import Btn from './components/Button'
import Loading from "./components/Loading";

const App = () => {

  const [loading, setLoading] = useState(false)

  const promiseLoadingFun = async (fun) => {
    setLoading(true)
    await fun()
    setLoading(false)
  }

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
                    <Btn name="获取日报" onClick={() => promiseLoadingFun(copySpendReport)} />
                    <Btn name="填写功能点" onClick={() => promiseLoadingFun(fillPointNum)}></Btn>
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