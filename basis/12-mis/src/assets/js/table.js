/*
* 表格模块
* 用表格的形式展现数据
*/

// 表格渲染模版
const tableTpl = '<thead>{{th}}</thead><tbody>{{tr}}</tbody>';
let theadTpl = '<tr>{{variable}}{{fixed}}</tr>';
const thTpl = '<th><p>{{name}}</p></th>';
const trTpl = '<tr data-index="{{index}}">{{td}}</tr>';
const tdEditTpl = '<td data-key="sale_{{key}}"><p> \
  <span>{{value}}</span><em class="edit">编辑</em> \
  <input type="text" value="{{value}}" /> \
  <em class="cancel">取消</em> \
  <em class="save">保存</em> \
  </p></td>';

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
    const attr = this.attr;
    if (config[key]) th.push(thTpl.replace('{{name}}', config[key].name));
    for (let i = 0; i < this.attrLength; i += 1) {
      if (attr[i] !== key) th.push(thTpl.replace('{{name}}', config[attr[i]].name));
    }
  
    return theadTpl.replace('{{variable}}', th.join(''));
  }
  // 生成table
  // 若有key 按key划分数据
  buildTable (data) {
    if (!data) return '';
    // const l = data.length;
    const tr = [];
    const firstKey = this.attrFirstKey;
    const config = this.config;
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
        const length = attr.length;
        if (firstKey) td.push(`<td><p>${items[j][firstKey]}</p></td>`)
        for (let k = 0; k < length; k += 1) {
          if (attr[k] === firstKey) continue;
          td.push(`<td><p>${items[j][attr[k]]}</p></td>`)
        }
        // 月份数据生成html
        const sale = items[j].sale;
        const saleLength = sale.length;
        for (let k = 0; k < saleLength; k += 1) { 
          const value = items[j].sale[k];
          td.push(tdEditTpl.replace(/{{value}}/g, value).replace('{{key}}', k));
        }
        // 处理table合并td
        if (j === 0) {
          td[0] = td[0].replace('<td', `<td rowspan="${l}"`);
        } else {
          td[0] = '';
        }
        tr.push(trTpl.replace('{{index}}', trIndex).replace('{{td}}', td.join('')));
        trIndex += 1;
      }
    }
    return tableTpl.replace('{{th}}', this.buildTheadTpl(firstKey)).replace('{{tr}}', tr.join(''));
  }
  // 触发表格事件
  trigger(target, saveCallback) {
    if (!target) return false;
    const tagName = target.tagName.toUpperCase();
    // 清除上一个且非当前元素被触发状态
    this.cancelUpdate(target);
    // 根据被点击的特定元素处理事件
    if (this.table.contains(target) && /SPAN|EM/.test(tagName)) {
      if (tagName === 'SPAN') {
        target.parentNode.classList.add('active');
      }
      if (tagName === 'EM') {
        const currentP = target.parentNode.parentNode;
        switch(target.className) {
          case 'edit': 
            // 注意层级嵌套问题
            target.parentNode.classList.add('active');
            break;
          case 'save': 
            if (saveCallback) saveCallback();
          default:
            this.cancelUpdate();
        }
      }
    }
  }
  // 清除元素被触发状态
  cancelUpdate(target) {
    const activeItem = this.table.querySelector('p.active');
    if (activeItem && (!target || !activeItem.contains(target))) activeItem.classList.remove('active');
  }
}

export default table;