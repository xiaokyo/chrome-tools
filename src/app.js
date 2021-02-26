import React, { useState } from 'react'
import Layer from 'react-layui-layer';

import s from './global.css'
import { getDateSpend } from './toolFuns/getDaySpend';

export default () => {
    const [isShow, setShow] = useState(false)

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
                    <div className={s.btn} onClick={() => getDateSpend()}>
                        获取日报
                    </div>
                </div>
            </Layer>
        </>
    )
}