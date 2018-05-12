import san from 'san';
import { router } from 'san-router';

import test_2 from './page/test_2';


router.add({
  rule: '/2',
  Component: test_2,
  target: '#app',
})

router.start();