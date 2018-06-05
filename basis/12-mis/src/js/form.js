/*
* 表单模块
* 承接用户的交互，生成/记录表单
*/
// 表单配置
const formConfig = {
  region: {
    name: '地区',
    type: 'checkbox',
    options: [
      {
        value: '华东',
        key: '1',
      },
      {
        value: '华南',
        key: '2',
      },
      {
        value: '华北',
        key: '3',
      },
    ],
  },
  product: {
    name: '商品',
    type: 'checkbox',
    options: [
      {
        value: '手机',
        key: '1',
      },
      {
        value: '笔记本',
        key: '2',
      },
      {
        value: '智能音箱',
        key: '3',
      },
    ]
  }
}

// 当前表单值
const form = {};

// 获取当前表单值
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
      const input = form.querySelectorAll(`[name=${key}]`);
      const l = input.length;
      const checked = [];
      for (let i = 0; i < l; i += 1) {
        if (input[i].checked) checked.push(input[i].value);
      }
      return checked;
    default:
      return form[key].value;
  }

}
// 修改form的属性值
const setValue = (key, value) => {
  if (!key) return false;
  form[key] = value;
};

export {
  getConfig,
  getForm,
  setValue,
  getValueByName,
};