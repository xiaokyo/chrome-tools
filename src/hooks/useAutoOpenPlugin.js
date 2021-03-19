import { useEffect } from "react";

export default () => {
  useEffect(() => {
    const queryUrl = location.href;
    const reportUrl = sessionStorage.getItem("spendReportUrl");

    if (queryUrl === reportUrl) {
      setShow(true);
    }
  }, []);
};
