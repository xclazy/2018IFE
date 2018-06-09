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
  const targetValueLength = Form.getCheckedInput(formWrapper, key).length;
  if (!target.checked && !targetValueLength) return target.checked = true;
  // 记录表单新值，返回是否变更
  const isChange = Form.setValue(key, Form.getValueByName(formWrapper, key));
  if (!isChange) return false;
  // 根据新数据渲染表格
  // 若地区只选了一个合并地区并且产品选择不止一个，其他情况合并商品选项
  const regionLength = key !== 'region' ? Form.getCheckedInput(formWrapper, 'region').length : targetValueLength;
  const productLength = key !== 'product' ? Form.getCheckedInput(formWrapper, 'product').length : targetValueLength;
  // 合并的key
  const soleKey = regionLength === 1 && productLength > 1 ? 'region' : 'product';
  // 根据新的表单值筛选符合的数据
  const result = Data.GroupByKey(Data.filterData(Form.getForm()), soleKey);
  return Common.render(Table.buildTable(result, soleKey), tableWrapper);
})

// 初始化页面, 默认显示全部数据
const init = () => {
  // 初始化各区域需要的
  Form.init(formWrapper);
  Table.init();
  Common.render(Table.buildTable(Data.GroupByKey(Data.filterData(), 'product')), tableWrapper);
}
init();