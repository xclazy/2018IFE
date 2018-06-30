import Restaurant from './class/restaurant';
import { Cook, Worker } from './class/worker';
import Dish from './class/dish';
import Customer from './class/customer';

var ifeRestaurant = new Restaurant({
  cash: 1000000,
  seats: 20,
  staff: []
});

var newCook = new Cook("Tony", 10000);
ifeRestaurant.hire(newCook);

console.log(ifeRestaurant.staff);

ifeRestaurant.fire(newCook);
console.log(ifeRestaurant.staff);