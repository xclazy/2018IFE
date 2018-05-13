import san from 'san';
import { router } from 'san-router';

import test2_1 from './page/2_1';
import test2_2 from './page/2_2';


router.add({
  rule: '/2_1',
  Component: test2_1,
  target: '#app',
})
router.add({
  rule: '/2_2',
  Component: test2_2,
  target: '#app',
})

router.start();