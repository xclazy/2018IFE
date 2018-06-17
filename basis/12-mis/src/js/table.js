/*
* 表格模块
* 用表格的形式展现数据
*/

// 表格渲染模版
const tableTpl = '<tr>{{th}}</tr>{{tr}}';
let theadTpl = '<tr>{{variable}}{{fixed}}</tr>';
const thTpl = '<th>{{name}}</th>';
const trTpl = '<tr data-index="{{index}}">{{td}}</tr>';
const tdTpl = '<td>{{value}}</td>';

class table {
  constructor(data, container, formConfig) {
    if (!container) return false;
    this.table = document.getElementById('table');
    if (!this.table) {
      container.innerHTML = '<table id="table" border=1></table>';
      this.table = document.getElementById('table');
    }

    // 用于控制除月份外表格数据显示顺序
    this.attr = [];
    this.attrLength = 0;
    
    // 表单配置
    this.config = formConfig;
    // 遍历配置生成表格th不变部分顺序及储存关键属性
    const th = [];
    for(const key in formConfig) {
      this.attr.push(key);
    }
    // 月份
    for (let i = 0; i < 12; i += 1) {
      th.push(thTpl.replace('{{name}}', `${i + 1}月`));
    }
    theadTpl = theadTpl.replace('{{fixed}}', th.join(''));
    // 记录属性长度
    this.attrLength = this.attr.length;
    if (data) this.setData(data);
  }
  setData(data, key) {
    if (!data) return false;
    this.data = data;
    this.attrFirstKey = key;
    this.table.innerHTML = this.buildTable(data);
  }
  // 生成表格th关键属性部分, key为第一列属性
  buildTheadTpl() { 
    // console.log(thArr)
    const th = [];
    const key = this.attrFirstKey;
    const config = this.config;
    const buildHtml = this.buildHtml;
    const attr = this.attr;
    if (config[key]) th.push(buildHtml(thTpl, '{{name}}', config[key].name));
    for (let i = 0; i < this.attrLength; i += 1) {
      if (attr[i] !== key) th.push(buildHtml(thTpl, '{{name}}', config[attr[i]].name));
    }
  
    return buildHtml(theadTpl, '{{variable}}', th.join(''));
  }
  // 生成table
  // 若有key 按key划分数据
  buildTable (data) {
    if (!data) return '';
    // const l = data.length;
    const tr = [];
    const key = this.attrFirstKey;
    const config = this.config;
    const buildHtml = this.buildHtml;
    const attr = this.attr;
    // 遍历数据
    let trIndex = 0;
    for (const i in data) {
      const items = data[i];
      const l = items.length;
      // 按分组遍历数据
      for (let j = 0; j < l; j += 1) {
        const td = [];
        // 遍历非月份外属性生成html
        td.push(...buildHtml(tdTpl, '{{value}}', items[j], attr, key));
        // 月份数据生成html
        td.push(...buildHtml(tdTpl, '{{value}}', items[j].sale))
        // 处理table合并td
        if (j === 0) {
          td[0] = td[0].replace('<td>', `<td rowspan="${l}">`);
        } else {
          td[0] = '';
        }
        tr.push(buildHtml(buildHtml(trTpl, '{{index}}', trIndex), '{{td}}', td.join('')));
        trIndex += 1;
      }
    }
    const tpl = buildHtml(tableTpl, '{{th}}', this.buildTheadTpl(key));
    return buildHtml(tpl, '{{tr}}', tr.join(''));
  }
  // 替换模版关键字并返回
  // value为数组或对象或字符串，若value为数组，遍历返回组装返回数组，
  // oKey控制是否用value的某(些）属性替换
  // firstKey 第一列
  buildHtml(tpl, key, data, dataKey, firstKey) {
    if (!tpl || !key) return '';
    let value = data;
    let oKey = dataKey;
    if (/boolean|string|number/.test(typeof value)) return tpl.replace(key, value);
    // 获取data和 dataKey的类型
    const oKeyType = Object.prototype.toString.call(oKey);
    const valueType = Object.prototype.toString.call(value);
    if (valueType === '[object Object]') {
      // 若oKey为数组，将value处理成数组，进入遍历
      switch (oKeyType) {
        case /\[object (String|Boolean|Number)\]/:
          return tpl.replace(key, value[okey]);
        case '[object Array]':
          value = [value];
          break;
        default:
          return tpl.replace(key, value);
      }
    } else if (valueType !== '[object Array]') {
      return false;
    }
    // 处理okey成数组,方便统一遍历
    if (oKeyType !== '[object Array]' && /boolean|string|number/.test(typeof oKey)) oKey = [oKey];
    const l = value.length;
    const keyl = oKey ? oKey.length : 0;
    const htmlArr = [];
    for (let i = 0; i < l; i += 1) {
      if (!value[i] || !oKey) {
        htmlArr.push(tpl.replace(key, value[i]));
        continue;
      }
      if (firstKey) htmlArr.push(tpl.replace(key, value[i][firstKey]));
      for (let j = 0; j < keyl; j += 1) {
        if (oKey[j] !== firstKey) htmlArr.push(tpl.replace(key, value[i][oKey[j]]));
      } 
    }
    return htmlArr;
  }
}

export default table;