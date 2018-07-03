/*
* 顾客
* es5
*/
var customer_id = 0;
var Customer = function() {
  customer_id += 1;
  this.id = customer_id;
  this.uneaten = []; // 已点未吃
  this.consume = 0; // 消费金额，按已吃的算
}
// 吃
Customer.prototype.eat = function(dish) {
  if (!dish) return false;
  console.log('顾客：开始吃-' + dish.name);
  // 菜色吃掉吃掉
  this.uneaten -= 1;
  // 记得算钱
  this.consume += dish.price;
  // 若所有菜色已吃完，下一步
  if (this.uneaten <= 0 && this.nextTo) this.nextTo(this.consume)
}
// 点菜
Customer.prototype.order = function(menu) {
  var dishes = [];
  var dishesName = []; 
  var menuLength = menu.length;
  // 最多点多少道菜
  var max = Math.ceil(Math.random() * menuLength);
  for (var i = 0; i < max; i += 1) {
    var dish = menu[Math.floor(Math.random() * menuLength)];
    dishes.push(dish);
    dishesName.push(dish.name)
  }
  console.log('顾客：点菜-' + dishesName.join(','));
  // 记录点的菜色
  this.uneaten = dishes.length;
  // 下一步
  if (this.nextTo) this.nextTo(dishes, this);
}


module.exports = Customer;