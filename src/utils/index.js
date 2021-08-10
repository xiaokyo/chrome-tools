/**
 * 返回form-urlencoded需要的参数
 * @param {Object} params 参数      
 * @returns  Content-Type: application/x-www-form-urlencoded; charset=UTF-8需要的参数
 */
export const getUrlencodedData = (params) => {
  let data = ''
  Object.keys(params).forEach((key, index) => {
    const value = params[key];
    const s = index === 0 ? "" : "&";
    data += `${s}${key}=${value}`;
  });
  return data
}