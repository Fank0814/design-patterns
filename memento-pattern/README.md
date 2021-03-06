---
title: "备忘录模式"
---

## 1. 什么是备忘录模式

> 它属于行为模式，保存某个状态，并且在**需要**的时候直接获取，而不是**重复计算**。

**注意**：备忘录模式实现，不能破坏原始封装。
也就是说，能拿到内部状态，将其保存在外部。

## 2. 应用场景

最典型的例子是“斐波那契数列”递归实现。
不借助备忘录模式，数据一大，就容易爆栈；借助备忘录，算法的时间复杂度可以降低到$ O(N) $

除此之外，数据的缓存等也是常见应用场景。

## 3. 多语言实现

### 3.1 ES6 实现

首先模拟了一下简单的拉取分页数据。
如果当前数据没有被缓存，那么就模拟异步请求，并将结果放入缓存中；
如果已经缓存过，那么立即取出即可，无需多次请求。

**main.js**：

```javascript
const fetchData = (() => {
  // 备忘录 / 缓存
  const cache = {};

  return page =>
    new Promise(resolve => {
      // 如果页面数据已经被缓存, 直接取出
      if (page in cache) {
        return resolve(cache[page]);
      }
      // 否则, 异步请求页面数据
      // 此处, 仅仅是模拟异步请求
      setTimeout(() => {
        cache[page] = `内容是${page}`;
        resolve(cache[page]);
      }, 1000);
    });
})();

// 以下是测试代码
const run = async () => {
  let start = new Date().getTime(),
    now;
  // 第一次: 没有缓存
  await fetchData(1);
  now = new Date().getTime();
  console.log(`没有缓存, 耗时${now - start}ms`);

  // 第二次: 有缓存 / 备忘录有记录
  start = now;
  await fetchData(1);
  now = new Date().getTime();
  console.log(`有缓存, 耗时${now - start}ms`);
};

run();
```

最近在项目中还遇到一个场景，在`React`中加载微信登陆二维码。
这需要编写一个插入`script`标签的函数。

要考虑的情况是：
  1. 同一个`script`标签不能被多次加载
  2. 对于加载错误，要正确处理
  3. 对于几乎同时触发加载函数的情况, 应该考虑锁住

基于此，**main2.js**文件编码如下：

```javascript
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
```

在`index2.html`中引入上述代码，即可查看效果：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <script src="./main2.js"></script>
</body>
</html>
```

### 3.2 python3 实现

这里实现一下借助“备忘录模式”优化过的、递归写法的“斐波那契数列”。

```python
def fibonacci(n):
  # 结果缓存
  mem = {1: 1, 2: 1} 

  def _fibonacci(_n):
    # 是否缓存
    if _n in mem:
      return mem[_n]
    mem[_n] = _fibonacci(_n - 1) + _fibonacci(_n - 2)
    return mem[_n]

  return _fibonacci(n)

if __name__ == '__main__':
  print(fibonacci(999))
```