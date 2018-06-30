/*
* 餐厅 
* ES5
*/

var Restaurant = function(config) {
  config = config || {};
  // 资金
  this.cash = config.cash || 0;
  // 座位数量
  this.seats = config.seats || 0;
  // 职员列表 
  this.staff = config.staff || [];
  // 菜单
  this.menu = config.menu || [];
}
// 招聘职员
Restaurant.prototype.hire = function(worker) {
  // 验证参数有效性
  if (!worker || Object.prototype.toString.call(worker) !== '[object Object]') return false;
  // 增加职员
  this.staff.push(worker);
}
// 解雇职员
Restaurant.prototype.fire = function(worker) {
  // 验证参数有效性
  if (!worker || Object.prototype.toString.call(worker) !== '[object Object]') return false;
  const index = this.staff.indexOf(worker);
  if (index < 0) return console.error('该职员不存在');
  // 删除职员
  this.staff.splice(index, 1);
}
// 增加菜品
Restaurant.prototype.addDish = function(dish) {
  if (!dish || Object.prototype.toString.call(dish) !== '[object Object]') return false;
  this.menu.push(dish);
}
// 删减菜品
Restaurant.prototype.delDish = function(dish) {
  // 验证参数有效性
  if (!dish || Object.prototype.toString.call(dish) !== '[object Object]') return false;
  const index = this.staff.indexOf(dish);
  if (index < 0) return console.error('该菜品 不存在');
  // 删除职员
  this.menu.splice(index, 1);
}

module.exports = Restaurant;