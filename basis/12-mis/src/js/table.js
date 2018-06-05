/*
* 表格模块
* 用表格的形式展现数据
*/
import { getConfig } from './form';

// 表格渲染模版
let tableTpl = '<table><tr>{{th}}</tr>{{tr}}</table>';
const thTpl = '<th>{{name}}</th>';
const trTpl = '<tr>{{td}}</tr>';
const tdTpl = '<td>{{value}}</td>';

// 用于控制除月份外表格数据显示顺序
const attr = [];
let attrLength = 0;

// 初识化表格，渲染生成模版非重复部分
const init = () => {
  const config = getConfig();
  const th = [];
  // 遍历配置生成表格头部及相应顺序
  for(const key in config) {
    th.push(thTpl.replace('{{name}}', config[key].name));
    attr.push(key);
  }
  // 月份
  for (let i = 0; i < 12; i += 1) {
    th.push(thTpl.replace('{{name}}', `${i + 1}月`));
  }
  // 记录属性长度
  attrLength = attr.length;
  tableTpl = tableTpl.replace('{{th}}', th.join(''));
}
init();

// 生成html
const buildHtml = (data) => {
  if (!data || !data.length) return false;
  const l = data.length;
  let table = tableTpl;
  const tr = [];
  // 遍历数据
  for (let i = 0; i < l; i += 1) {
    const item = data[i];
    const td = [];
    // 遍历非月份外属性生成html
    for (let j = 0; j < attrLength; j += 1) {
      td.push(tdTpl.replace('{{value}}', item[attr[j]]));
    }
    // 月份数据生成html
    const sale = item.sale;
    for (let k = 0; k < 12; k += 1) {
      td.push(tdTpl.replace('{{value}}', sale[k]));
    }
    tr.push(trTpl.replace('{{td}}', td.join('')));
  }
  return table.replace('{{tr}}', tr.join(''));
};

// 渲染html到页面上
const renderTable = (html, container) => {
  if (!html || !container) return false;
  container.innerHTML = html;
}

export {
  buildHtml,
  renderTable,
};