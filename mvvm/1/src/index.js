import san from 'san';

var MyApp = san.defineComponent({
  template: '<p>{{text}}!</p>',

  initData: function () {
      return {
        text: 'Hello world'
      };
  }
});
var myApp = new MyApp();
myApp.attach(document.body);