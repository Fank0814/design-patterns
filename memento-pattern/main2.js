// 备忘录模式: 防止重复加载
const loadScript = (src) => {
  let exists = false;

  return () => new Promise((resolve, reject) => {
    if(exists) return resolve();
    // 防止没有触发下方的onload时候, 又调用此函数重复加载
    exists = true;
    // 开始加载
    let script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.onerror = (ev) => {
      // 加载失败: 允许外部再次加载
      script.remove();
      exists = false;
      reject(new Error('Load Error'));
    };
    script.onload = () => {
      // 加载成功: exists一直为true, 不会多次加载
      resolve();
    };
    document.body.appendChild(script);
  });
};

/************** 测试代码 **************/
// 专门用于加载微信SDK的代码
const wxLoader = loadScript('https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.jser');
// html中只有1个微信脚本
setInterval(() => {
  wxLoader()
    .then()
    .catch(error => console.log(error.message))
}, 5000);