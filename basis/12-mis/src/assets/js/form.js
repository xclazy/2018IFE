/*
* 表单模块
* 承接用户的交互，生成/记录表单
*/
// 表单配置
// html模版
const titleTpl = '<span class="title">{{title}}</span>';
const checkboxTpl = '<label for="{{name}}_{{key}}"><input type="checkbox" value="{{value}}" name="{{name}}" id="{{name}}_{{key}}"/>{{text}}</label>';

class form {
  constructor(container, formConfig, currentValue) {
    // 当前表单值
    this.form = container;
    this.config = formConfig;
    this.formValue = currentValue || {};
    for (const key in formConfig) {
      const type = formConfig[key].type;
      document.getElementById(`${key}-${type}`).innerHTML = this.buildFormItem(formConfig[key], key);
      // 选择指定值。若无指定根据配置来
      // 假定只有多选checkbox
      const values = currentValue ? currentValue[key] : null;
      if ((values && values.length) || formConfig[key].checked) {
        this.checkValue(key, true, values, formConfig[key].checked);
        this.formValue[key] = this.getValueByName(key);
      }
      // if (!values) {
      //   // if (type !== 'checkbox' || !formConfig[key].checked) continue;
      //   if (!formConfig[key].checked) continue;
      //   this.checkValue(key, true);
      // } else {
      // }
    }
  }
  // 将所有的checkbox全选/全不选
  checkAllValue(isChecked) {
    const input = this.form.querySelectorAll('input[type=checkbox]');
    const l = input.length;
    for (let i = 0; i < l; i += 1) {
      input[i].checked = isChecked;
    }
  }
  // 生成表单某项html 
  buildFormItem(conf, name) {
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
  // 获取当前表单值
  getForm() {
    return this.formValue;
  };
  // 获取表单Dom内某name属性值
  getValueByName(key) {
    if (!key) return false;

    // 从配置读取该name对应的控件类型
    switch(this.config[key].type) {
      case 'checkbox':
        // 遍历找出选中的值返回 
        const input = this.form.querySelectorAll(`[name=${key}]:not([value=all])`);
        const l = input.length;
        const checkedValue = [];
        for (let i = 0; i < l; i += 1) {
          if (input[i].checked) checkedValue.push(input[i].value);
        }
        // 处理全选状态
        this.setAllChecked(key, checkedValue.length === l);
        return checkedValue;
      default:
        return this.formValue[key].value;
    }
  }
  // 对表单进行全选/取消全选
  checkValue(key, isChecked, values, isCheckedForce) {
    if (values && !values.length) return false;
    // 遍历相应的控件(排除全选按钮),根据values设置选中状态
    const input = this.form.querySelectorAll(`[name=${key}]:not([value=all])`);
    const l = input.length;
    let checkedLength = 0;
    for (let i = 0; i < l; i += 1) {
      if (values && values.indexOf(input[i].value) === -1) {
        input[i].checked = !isChecked;
      } else {
        input[i].checked = isChecked;
        checkedLength += 1; 
      };
    }
    // 若有values但完全不匹配现有选项，根据isCheckedForce来全选/全不选
    if (values && checkedLength === 0) this.checkValue(key, isCheckedForce);
    // 设置全选按钮
    this.setAllChecked(key, checkedLength === input.length ? isChecked : !isChecked);
  }
  // 设置全选选项的选中状态
  setAllChecked(key, isChecked) {
    const input = this.form.querySelector(`#${key}_all`);
    if (!input) return false;
    input.checked = isChecked;
  }
  // 修改form的属性值
  // 都为空就显示所有数据
  setValue(value, key) {
    // if (!key && !value) return false;
    // if (form[key] === value) return flase;
    if (key) {
      this.formValue[key] = value;
    } else {
      this.formValue = value || {};
      if (value) {
        for (const key in value) { 
          // 假定只有多选checkbox
          const values = value[key] || null;
          if (values && values.length) {
            this.checkValue(key, true, values);
          }
        }
      } else {
        this.checkAllValue(true);
      }
    }
    return this.formValue;
  };
  // 返回选中的input
  getCheckedInput(key) {
    return this.form.querySelectorAll(`input[name=${key}]:checked`);
  }
}
export default form;