
// 表单配置
export default {
  product: {
    title: '商品类型',
    name: '商品',
    type: 'checkbox',
    checked: true, // 是否默认全选
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
  },
  region: {
    title: '地区',
    name: '地区',
    type: 'checkbox',
    checked: true, // 是否默认全选
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
};