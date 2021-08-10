import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import loadingJson from "./loading.json";

import s from './index.css'

export default () => {
  const ref = useRef();

  useEffect(() => {
    lottie.loadAnimation({
      container: ref.current, // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      // path: "/egg/image/cj_lottie.json", // the path to the animation json
      animationData: loadingJson,
    });
  }, []);

  return <div className={s.loading} ref={ref}></div>;
};
