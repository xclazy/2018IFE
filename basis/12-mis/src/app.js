import * as Form from './js/form.js';
import * as Data from './js/data.js';
import * as Table from './js/table.js';

// 初始化页面
var init = function() {

}
const formWrapper = document.getElementById('option-form');
const tableWrapper = document.getElementById('table-wrapper');
// 监听表单变更
formWrapper.addEventListener('change', (e) => {
  // 记录储存新的变更
  const key = e.target.name;
  Form.setValue(key, Form.getValueByName(formWrapper, key));
  // 根据新的表单值筛选符合的数据
  const result = Data.filterData(Form.getForm());
  // 根据新数据渲染表格
  Table.renderTable(Table.buildHtml(result), tableWrapper);
})
