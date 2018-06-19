import Form from './assets/js/form.js';
import Data from './assets/js/data.js';
import Table from './assets/js/table.js';
import Chart from './assets/js/chart.js';
import Router from './assets/js/router.js';
// 表单配置
import formConfig from './assets/js/conf/formConfig.js';
 // 假数据
import sourceData from './assets/js/conf/sourceData.js';
// 样式
import './assets/css/style.less';

// 初始化页面, 默认显示全部数据
const init = () => {
  // 获取路由上hash值

  // 路由创建
  const oRouter = new Router();
  // 图表创建
  const oChart = new Chart(null, document.getElementById('chart-wrapper'));
  // 表格创建
  const oTable = new Table(null, document.getElementById('table-wrapper'), formConfig);
  // 表格创建
  const oForm = new Form(document.getElementById('option-form'), formConfig, oRouter.getHash());
  // 数据创建
  const oData = new Data(sourceData);

  // 保存表格修改， 跨了多个模块，所以放这入口文件
  const saveUpdate = () => {
    const activeNode = document.querySelector('p.active');
    // 保存需验证数据是
    const input = activeNode.querySelector('input');
    let value = input.value;
    if (!Number(value) && value !== '0') return alert('请输入正确数字');
    value = Number(value);
    activeNode.querySelector('span').innerHTML = value;
    // 找到记录了数据index的tr节点, 记录单元格key的td
    let trNode = null;
    let tdNode = null;
    let currentNode = activeNode;
    do {
      const tagName = currentNode.tagName.toUpperCase();
      if (tagName === 'TR') trNode = currentNode;
      if (tagName === 'TD') tdNode = currentNode;
      currentNode = currentNode.parentNode;
    } while (!trNode);

    // 保存新数据后更新图表
    oData.changeData(trNode.dataset['index'], tdNode.dataset['key'], value, (data) => {
      oChart.setData(data.sale);
    });
  }
  // 根据表单修改显示数据
  const changeForm = () => {
    // 若地区只选了一个合并地区并且产品选择不止一个，其他情况合并商品选项
    const regionLength = oForm.getCheckedInput('region').length;
    const productLength = oForm.getCheckedInput('product').length;
    // 合并的key
    const soleKey = regionLength === 1 && productLength > 1 ? 'region' : 'product';
    // 根据新的表单值筛选符合的数据
    oData.filterData(oForm.getForm());
    const result = oData.groupByKey(soleKey);
    // 渲染表格/图表
    oTable.setData(result, soleKey);
    oChart.setData(oData.getValueList('sale'));
  }
  // 初始化各模块该显示的
  changeForm();

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
    // 确定修改有效，修改hash值
    const newFormValue = oForm.setValue(oForm.getValueByName(key), key);
    oRouter.pushState(newFormValue);
    changeForm();
    // 记录表单新值，返回是否变更
    // const isChange = oForm.setValue(key, oForm.getValueByName(key));
    // if (!isChange) return false;
    // 根据新数据渲染表格
  })
  // 路由监听事件
  oRouter.listenerPopstate((e) => {
    // if (!e.state) return false;
    oForm.setValue(e.state);
    changeForm();
  })
  // 监听表格鼠标事件
  // 鼠标移动到某条数据上图表显示单条数据
  document.getElementById('table').addEventListener('mouseover', (e) => {
    let currentIndex = null;
    const target = e.target;
    // 非tr内元素不执行其他逻辑
    if (!/SPAN|P|EM|TD/.test(target.tagName.toUpperCase())) return false;
    // 找到存储index的tr节点
    let trNode = null;
    let currentNode = target;
    do {
      const tagName = currentNode.tagName.toUpperCase();
      if (tagName === 'TR') trNode = currentNode;
      currentNode = currentNode.parentNode;
    } while (!trNode);
    currentIndex = trNode.dataset['index'];
    // 没找到不更新图表
    if (/null|undefined/.test(currentIndex)) return false;
    oChart.setData(oData.getData()[currentIndex].sale);
  })
  // 鼠标移开表格时图表默认显示全部数据
  document.getElementById('table').addEventListener('mouseleave', (e) => {
    oChart.setData(oData.getValueList('sale'));
  })
  // 表格点击触发编辑相关事件
  document.addEventListener('click', (e) => {
    const target = e.target;
    // 页面被点击，触发事件
    oTable.trigger(target, () => {
      saveUpdate(target)
    });
  })
  // 监听键盘
  document.addEventListener('keydown', (e) => {
    const keyCode = e.keyCode;
    // 按下Esc(27)取消修改
    if (keyCode === 27) {
      e.preventDefault();
      oTable.cancelUpdate();
    } else if (keyCode === 13) {
      // 按下回车键(13)保存修改
      e.preventDefault();
      console.log(2323)
      saveUpdate();
      oTable.cancelUpdate();
    }
  })
}
init();