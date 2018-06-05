/*
* 数据处理模块
* 根据用户的输入，对数据进行组合，提供给页面展现
*/

import sourceData from './sourceData.js'; // 假数据

// 根据配置筛选数据 返回筛选的数据
const filterData = (json) => {
  // 拷贝一份数据，遍历数据
  const data = [].concat(sourceData);
  let length = data.length;
  for (let i = 0; i < length; i++) {
    // 判断是否符合表单条件
    for (const key in json) {
      const term = json[key];
      if (term === null) continue;
      if ((Object.prototype.toString.call(term) === '[object Array]' && term.indexOf(data[i][key]) !== -1) || data[i][key] === term) continue;
      // 删除不符合的数据
      data.splice(i, 1);
      length -= 1;
      i -= 1;
      break;
    }
  }
  return data;
}

export {
  filterData,
}