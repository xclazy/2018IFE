import {
  Restaurant,
  Cook,
  Waiter,
  Dish,
  Customer,
} from './module/class';

// 饭店实例
const restaurant = new Restaurant({
  cash: 1000000, // 资金
  seats: 1, // 座位
  staff: [], // 职员
});
// 菜单
const menu = [
  new Dish('番茄炒蛋', 10, 22),
  new Dish('清炒菜心', 10, 22),
  new Dish('清蒸鲈鱼', 20, 45),
  new Dish('凉拌青瓜', 6, 16),
  new Dish('紫菜蛋花汤', 8, 20),
];
// 雇佣1名服务员和1名厨师
const waiter = new Waiter("Chirs", 4000);
const cook = new Cook("Ken", 7000);
restaurant.hire(cook);
restaurant.hire(waiter);

// 时间单位-全局
// window.timeUnit = 100;

/* 类之间流程 */
// 服务员-参数dish为数组，告诉厨师做菜； 参数dish为对象，给顾客上菜
// 暂定每次只服务一个顾客
Waiter.prototype.nextTo = (dish) => {
  if (Object.prototype.toString.call(dish) === '[object Array]') {
    return cook.doWork(dish);
  }
  return customers[0].eat(dish);
} 

// 厨师-烹饪后通知服务员上菜 
Cook.prototype.nextTo = (dish) => {
  // 扣除菜色成本
  restaurant.cash -= dish.cost;
  return waiter.doWork(dish);
} 

// 顾客-参数为数组，服务员下单点菜；参数为数值，吃完付款离开
Customer.prototype.nextTo = (arg) => {
  if (Object.prototype.toString.call(arg) === '[object Array]') {
    return waiter.doWork(arg);
  }
  // 吃完后1个时间单位后走人
  const self = this;
  // ...付款....
  console.log('顾客：付款');
  restaurant.cash += arg;
  // 付款后删除
  console.log('-> 顾客走了')
  customers.shift();
}


// 顾客
const customers = [];

// 顾客到来
const customerCome = () => {
  const customer = new Customer();
  console.log('-> 新客到')
  customers.push(customer);
  // 开始点菜
  customer.order(menu);
}
// 开始营业
const start = () => {
  console.log('-> 开始营业');
  console.log(`-> 现有资金${restaurant.cash}`);
  // 暂定招待完6个客人就关店
  let count = 3;
  // 每一秒判断是否来新客人,暂时不存在排队
  var loop = setInterval(() => {
    if (count <= 0) {
      console.log('-> 停止营业');
      console.log(`-> 现有资金${restaurant.cash}`);
      return window.clearInterval(loop);
    }
    if (restaurant.seats > customers) {
      customerCome();
      count -= 1;
    }
  }, 500);
}

start();