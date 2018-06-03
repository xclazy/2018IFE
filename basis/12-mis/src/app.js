import * as Form from './js/form.js';
import * as Data from './js/data.js';
import * as Table from './js/table.js';

// 初始化页面
var init = function() {

}

// 监听表单变更
document.getElementById('option-form').addEventListener('change', (e) => {
  // 记录储存新的变更
  const target = e.target;
  Form.setValue(target.name, target.value);
  // 根据新的表单值筛选符合的数据
  const result = Data.filterData(Form.getForm());
  // 根据新数据徐然表格
  Table.render(Table.buildHtml(result));
})
