import React from "react";

import s from './index.css'

export default ({ name = "", ...props }) => (
  <div className={s.btn} {...props}>
    {name}
  </div>
);
