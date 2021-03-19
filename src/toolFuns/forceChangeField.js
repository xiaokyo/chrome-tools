/**
 * 返回元素
 * @param {Function} onClick 点击事件
 * @param {string} title 按钮标题
 * @returns 元素A
 */
const createElemA = (onClick, title) => {
  const a = document.createElement("a");
  a.href = "#self";
  a.onclick = () => {
    console.log("test");
    onClick();
    return;
  };
  a.innerText = title;

  return a;
};

export const showOtherOperator = () => {
  const trs = document.querySelectorAll("[data-item-id]");
  console.log(trs);

  trs.forEach((tr) => {
    const dropdownList = tr
      .getElementsByClassName("dropdown-menu")[0]
      .getElementsByTagName("ul")[0];

    const effortBtn = createElemA(() => {}, "预估工时");
    dropdownList?.appendChild(effortBtn);
  });
};
