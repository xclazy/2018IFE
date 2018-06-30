
/*
* 工作人员
* ES6
*/
let word_id = 0;
class Worker {
  constructor(name, wages) {
    word_id += 1;
    this.id = word_id;
    this.name = name;
    this.wages = wages;
  }
  work() {
    
  }
}
// 服务员
class Waiter extends Worker {
  constructor(name, wages) {
    super(name, wages);

  }
  // 记录用户点菜/上菜
  work(arg) {
    if(Object.prototype.toString(arg) === '[object Object]') {
       
    } else {
  
    }
    super.work();
  }
}
// 厨师
class Cook extends Worker {
  constructor(name, wages) {
    super(name, wages);

  }
  // 烹饪菜品
  work(dish) {
    
    super.work();
  }
}

export {
  Cook,
  Waiter
}