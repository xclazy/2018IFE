import * as Form from './js/form.js';
import * as Data from './js/data.js';
import * as Table from './js/table.js';
import * as Common from './js/common.js';
// 表单配置
import formConfig from './js/formConfig.js';

const formWrapper = document.getElementById('option-form');
const tableWrapper = document.getElementById('table-wrapper');

// 监听表单变更
formWrapper.addEventListener('change', (e) => {
  // 记录储存新的变更
  const target = e.target;
  const key = target.name;
  if (!key) return false;
  // 全选按钮
  if(target.value === 'all') {
    // 不给取消全选
    if (!target.checked) return target.checked = true;
    Form.checkAll(formWrapper, key, target.checked);
  }
  // 不给一个不选
  if (!target.checked && !Form.getCheckedInput(formWrapper, key).length) return target.checked = true;
  // 记录表单新值，返回是否变更
  const isChange = Form.setValue(key, Form.getValueByName(formWrapper, key));
  if (!isChange) return false;
  console.log(22)
  // 根据新的表单值筛选符合的数据
  const result = Data.filterData(Form.getForm());
  // 根据新数据渲染表格
  Common.render(Table.buildHtml(result), tableWrapper);
})

// 初始化页面, 默认显示全部数据
const init = () => {
  Form.init(formWrapper);
  Table.init();
  Common.render(Table.buildHtml(Data.filterData()), tableWrapper);
}
init();