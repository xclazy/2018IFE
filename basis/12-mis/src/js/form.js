/*
* 表单模块
* 承接用户的交互，生成/记录表单
*/
// 表单配置
import formConfig from './formConfig.js';
import * as Common from './common.js';

// html模版
const titleTpl = '<span class="title">{{title}}</span>';
const checkboxTpl = '<label for="{{name}}_{{key}}"><input type="checkbox" value="{{value}}" name="{{name}}" id="{{name}}_{{key}}"/>{{text}}</label>';

// 当前表单值
const form = {};
// 初始化
const init = (form) => {
  for (const key in formConfig) {
    const type = formConfig[key].type;
    Common.render(buildFormItem(formConfig[key], key), document.getElementById(`${key}-${type}`));
    // 设置全选
    if (type !== 'checkbox' || !formConfig[key].checked) continue;
    checkAll(form, key, true);
    setAllChecked(key, true);
  }
}
// 生成表单某项html 
const buildFormItem = (conf, name) => {
  console.log(conf)
  if (!conf) return false;
  const html = [
    titleTpl.replace('{{title}}', conf.title),
  ];
  const tpl = checkboxTpl.replace(/{{name}}/g, name);
  if (conf.type === 'checkbox') html.push(tpl.replace(/{{(key|value)}}/gi, 'all').replace(/{{text}}/g, '全选'));
  const options = conf.options;
  const l = options.length;
  for (let i = 0; i < l; i += 1) {
    const option = options[i];
    html.push(tpl.replace(/{{key}}/g, option.key)
      .replace(/{{value}}/g, option.value)
      .replace(/{{text}}/g, option.text || option.value));
  }
  return html.join('');
}
// 获取表单配置
const getConfig = () => {
  return formConfig;
};
// 获取当前表单值
const getForm = () => {
  return form;
};
// 获取表单Dom内某name属性值
const getValueByName = (form, key) => {
  if (!form || !key) return false;
  // 从配置读取该name对应的控件类型
  switch(formConfig[key].type) {
    case 'checkbox':
      // 遍历找出选中的值返回 
      const input = form.querySelectorAll(`[name=${key}]:not([value=all])`);
      const l = input.length;
      const checkedValue = [];
      for (let i = 0; i < l; i += 1) {
        if (input[i].checked) checkedValue.push(input[i].value);
      }
      // 处理全选状态
      setAllChecked(key, checkedValue.length === l);
      return checkedValue;
    default:
      return form[key].value;
  }
}
// 对表单进行全选/取消全选并返回
const checkAll = (form, key, isChecked) => {
  if (!form) return false;
  // 遍历相应的控件(排除全选按钮),设置选中状态及返回当前值
  const input = form.querySelectorAll(`[name=${key}]:not([value=all])`);
  const l = input.length;
  for (let i = 0; i < l; i += 1) {
    input[i].checked = isChecked;
  }
}
// 设置全选选项的选中状态
const setAllChecked = (key, isChecked) => {
  const input = document.getElementById(`${key}_all`);
  if (!input) return false;
  input.checked = isChecked;
}
// 修改form的属性值
const setValue = (key, value) => {
  if (!key) return false;
  if (form[key] === value) return flase;
  form[key] = value;
  return true;
};
// 返回选中的input
const getCheckedInput = (formWrapper, key) => {
  return formWrapper.querySelectorAll(`input[name=${key}]:checked`);
}
export {
  init,
  getConfig,
  getForm,
  setValue,
  getValueByName,
  checkAll,
  setAllChecked,
  getCheckedInput
};