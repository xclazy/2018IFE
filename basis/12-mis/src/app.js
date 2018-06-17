import Form from './js/form.js';
import Data from './js/data.js';
import Table from './js/table.js';
import Chart from './js/chart.js';
// 表单配置
import formConfig from './js/conf/formConfig.js';
 // 假数据
import sourceData from './js/conf/sourceData.js';

// 图表创建
const oChart = new Chart(null, document.getElementById('chart-wrapper'));
// 表格创建
const oTable = new Table(null, document.getElementById('table-wrapper'), formConfig);
// 表格创建
const oForm = new Form(document.getElementById('option-form'), formConfig);
// 数据创建
const oData = new Data(sourceData);

// 监听表单变更
document.getElementById('option-form').addEventListener('change', (e) => {
  // 记录储存新的变更
  const target = e.target;
  const key = target.name;
  if (!key) return false;
  // 全选按钮
  if(target.value === 'all') {
    // 不给取消全选
    if (!target.checked) return target.checked = true;
    oForm.checkAll(key, target.checked);
  }
  // 不给一个不选
  const targetValueLength = oForm.getCheckedInput(key).length;
  if (!target.checked && !targetValueLength) return target.checked = true;
  // 记录表单新值，返回是否变更
  const isChange = oForm.setValue(key, oForm.getValueByName(key));
  if (!isChange) return false;
  // 根据新数据渲染表格
  // 若地区只选了一个合并地区并且产品选择不止一个，其他情况合并商品选项
  const regionLength = key !== 'region' ? oForm.getCheckedInput('region').length : targetValueLength;
  const productLength = key !== 'product' ? oForm.getCheckedInput('product').length : targetValueLength;
  // 合并的key
  const soleKey = regionLength === 1 && productLength > 1 ? 'region' : 'product';
  // 根据新的表单值筛选符合的数据
  oData.filterData(oForm.getForm());
  const result = oData.groupByKey(soleKey);
  // 渲染表格/图表
  oTable.setData(result, soleKey);
  oChart.setData(oData.getValueList('sale'));

})

// 监听表格鼠标事件
document.getElementById('table').addEventListener('mouseover', (e) => {
  let currentIndex = null;
  const target = e.target;
  const tagName = target.tagName.toUpperCase();
  if (tagName === 'TD') {
    currentIndex = target.parentNode.dataset['index'];
  }
  if (tagName === 'TR') {
    currentIndex = target.dataset['index'];
  }
  if (currentIndex === null) return false;
  oChart.setData(oData.getData()[currentIndex].sale);
})
document.getElementById('table').addEventListener('mouseleave', (e) => {
  oChart.setData(oData.getValueList('sale'));
})
// 初始化页面, 默认显示全部数据
const init = () => {
  // 初始化各区域显示的
  oData.filterData();
  oTable.setData(oData.groupByKey('product'));
  oChart.setData(oData.getValueList('sale'));
}
init();