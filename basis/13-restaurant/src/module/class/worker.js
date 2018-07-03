
/*
* 工作人员
* ES6
*/
// 基础类
let word_id = 0;
class Worker {
  constructor(name, wages) {
    word_id += 1;
    this.id = word_id;
    this.name = name;
    this.wages = wages;
  }
  doWork() {
    
  }
}
// 服务员 - 单例模式
class Waiter extends Worker {
  constructor(name, wages) {
    if (Object.prototype.toString.call(Waiter.instance) === '[object Object]') return Waiter.instance;
    super(name, wages);
    Waiter.instance = this;
  }
  // 记录用户点菜/上菜
  doWork(arg) {
    if(Object.prototype.toString.call(arg) === '[object Array]') {
      console.log('服务员: 记录点菜');
    } else {
      console.log('服务员: 上菜-' + arg.name);
    }
    super.doWork();
    if (this.nextTo) this.nextTo(arg);
  }
}
// 厨师 - 单例模式
class Cook extends Worker {
  constructor(name, wages) {
    if (Object.prototype.toString.call(Cook.instance) === '[object Object]') return Cook.instance;
    super(name, wages);
    Cook.instance = this;
  }
  // 烹饪菜品
  doWork(arg) {
    let dishes = arg;
    if (Object.prototype.toString.call(dishes) !== '[object Array]') dishes = [arg];
    const dishLength = dishes.length;
    for (let i = 0; i < dishLength; i += 1) {
      console.log('厨师: 烹饪-' + dishes[i].name);
      super.doWork();
      if (this.nextTo) this.nextTo(dishes[i]);
    }
  }
}

export {
  Cook,
  Waiter
}