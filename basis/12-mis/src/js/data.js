/*
* 数据处理模块
* 根据用户的输入，对数据进行组合，提供给页面展现
*/

class data {
  constructor(data = []) {
    this.data = data;
    this.currentData = data;
  }
  // 根据配置筛选数据 返回筛选的数据
  filterData(json) {
    if (!json) return this.data;
    // 拷贝一份数据，遍历数据
    const data = [].concat(this.data);
    let length = data.length;
    for (let i = 0; i < length; i++) {
      // 判断是否符合表单条件
      for (const key in json) {
        const term = json[key];
        // if (term === null) continue;
        if ((Object.prototype.toString.call(term) === '[object Array]' && term.indexOf(data[i][key]) !== -1) || data[i][key] === term) continue;
        // 删除不符合的数据
        data.splice(i, 1);
        length -= 1;
        i -= 1;
        break;
      }
    }
    this.currentData = data;
  }
  // 获取当前选择数据
  getData() {
    return this.currentData;
  }
  // 数据分组
  GroupByKey(key) {
    data = this.currentData;
    if (!key) return data;
    const length = data.length;
    const newArr = {};
    const values = []; // 用于分组，避免出现中文
    for (let i = 0; i < length; i += 1) {
      if (!data[i]) continue;
      // 以key的数据值为基准划分数组
      const keyValue = data[i][key];
      let j = values.indexOf(keyValue); // 找到分组依据对应的唯一标志
      // 每个新组需要赋值
      if (j === -1) {
        values.push(keyValue);
        j = values.length - 1;
        newArr[j] = [];
      }
      // 将数据添加到对应组
      newArr[j].push(data[i]); 
    }
    return newArr
  }
}
export default data;