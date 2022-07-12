import React, { useEffect, useState } from "react";
import { copySpendReport } from "./toolFuns/getDaySpend";
import fillPointNum from './toolFuns/fillPointNum'
import ChangeTapdStatus from './toolFuns/change-tapd-status'

import s from "./global.css";

import Btn from './components/Button'
import Loading from "./components/Loading";
import useDrag from "./hooks/useDrag";

const App = () => {

  const [loading, setLoading] = useState(false)

  const [spendToday, setSpendToday] = useState("")

  // 拖动
  useDrag('drag-box')

  const promiseLoadingFun = (fun) => {
    return async (...args) => {
      setLoading(true)
      const res = await fun(...args)
      setLoading(false)
      return res
    }
  }

  useEffect(() => {
    // 获取今日消费
    const getSpendToday = promiseLoadingFun(copySpendReport)
    getSpendToday({
      type: 'today',
      isCopy: false
    }).then((res) => {
      setSpendToday(res || '暂无数据')
    })
  }, [])

  const toolBtns = [
    {
      name: '获取日报',
      fun: copySpendReport,
    },
    {
      name: '指定日期日报',
      fun: copySpendReport,
      args: {
        type: 'date'
      }
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
                Plugins
                <div className={s.container}>
                  <div className={s.box}>
                    {
                      toolBtns.map(_ => <Btn key={_.name} name={_.name} onClick={() => promiseLoadingFun(_.fun)(_.args)} />)
                    }
                  </div>

                  <div className={s.spendToday} dangerouslySetInnerHTML={{ __html: spendToday.replace(/\r\n/g, '<br />') }}></div>
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