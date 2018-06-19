/*
* 路由模块
* 指挥页面该以什么样的状态来呈现页面
*/

class router {
  constructor() {
  }
  // 增加浏览器历史记录
  pushState(value) {
    history.pushState(value, null, this.getNewHref(value))
  }
  // 监听浏览器后退
  listenerPopstate(callback) {
    // 清楚旧的监听事件
    if (this.onpopstate) window.removeEventListener('popstate', this.onpopstate);
    this.onpopstate = callback;
    window.addEventListener('popstate', this.onpopstate);
  }
  // 根据内容修改url的hash后返回
  getNewHref(value) {
    const hash = [];
    for (let key in value) {
      hash.push(`${key}=${value[key].join(',')}`);
    }
    const newHash = `#${hash.join('&')}`;
    const urlHash = location.hash;
    const newUrl = urlHash ? location.href.replace(urlHash, encodeURI(newHash)) : location.href + newHash;
    this.hash = newHash;
    return newUrl;
  }
  // 将浏览器的hash组装成对象返回
  getHash() {
    if (!location.hash) return null;
    this.hash = decodeURI(location.hash);
    // 将hash上附带的信息处理成对象
    const arr = this.hash.split(/#|&/);
    const length = arr.length;
    const values = {};
    for (let i = 0; i < length; i += 1){
      // 处理成 [key,value]
      const val = arr[i].split('=');
      if (val[1]) values[val[0]] = val[1].split(',');
    }
    return values;
  }
}

export default router;