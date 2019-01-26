---
title: "订阅-发布模式"
---

## 1. 什么是“订阅-发布模式”？

> 订阅-发布模式定义了对象之间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖它的对象都可以得到通知。

了解过事件机制或者函数式编程的朋友，应该会体会到“订阅-发布模式”所带来的“**时间解耦**”和“**空间解耦**”的优点。借助函数式编程中闭包和回调的概念，可以很优雅地实现这种设计模式。

## 2. “订阅-发布模式” vs 观察者模式

订阅-发布模式和观察者模式概念相似，但在订阅-发布模式中，订阅者和发布者之间多了一层中间件：一个被抽象出来的信息调度中心。

但其实没有必要太深究2者区别，因为《Head First 设计模式》这本经典书都写了：**发布+订阅=观察者模式**。

其**核心思想**是状态改变和发布通知。在此基础上，根据语言特性，进行实现即可。

## 3. 代码实现

### 3.1 ES6 实现

JS中一般用事件模型来代替传统的发布-订阅模式。任何一个对象的原型链被指向`Event`的时候，这个对象便可以绑定自定义事件和对应的回调函数。

```javascript
// 数组置空：
// arr = []; arr.length = 0; arr.splice(0, arr.length)
class Event {
  constructor() {
    this._cache = {};
  }

  // 注册事件：如果不存在此种type，创建相关数组
  on(type, callback) {
    this._cache[type] = this._cache[type] || [];
    let fns = this._cache[type];
    if (fns.indexOf(callback) === -1) {
      fns.push(callback);
    }
    return this;
  }

  // 触发事件：对于一个type中的所有事件函数，均进行触发
  trigger(type, ...data) {
    let fns = this._cache[type];
    if (Array.isArray(fns)) {
      fns.forEach(fn => {
        fn(...data);
      });
    }
    return this;
  }

  // 删除事件：删除事件类型对应的array
  off(type, callback) {
    let fns = this._cache[type];
    // 检查是否存在type的事件绑定
    if (Array.isArray(fns)) {
      if (callback) {
        // 卸载指定的回调函数
        let index = fns.indexOf(callback);
        if (index !== -1) {
          fns.splice(index, 1);
        }
      } else {
        // 全部清空
        fns = [];
      }
    }
    return this;
  }
}

class SaleOffice extends Event {
  constructor(){
    super();
  }
}

let saleOffice = new SaleOffice();

saleOffice.on("event01", fn1 = (price) => {
  console.log("Price is", price, "at event01");
});

saleOffice.on("event02", fn2 = (price) => {
  console.log("Price is", price, "at event02");
});

saleOffice.trigger("event01", 1000);
saleOffice.trigger("event02", 2000);

saleOffice.off("event01", fn1);

// 没有任何输出
// 说明删除成功
saleOffice.trigger("event01", 1000);
```

### 3.2 python3实现

python中我们定义一个事件类`Event`, 并且为它提供 事件监听函数、（事件完成后）触发函数，以及事件移除函数。任何类都可以通过继承这个通用事件类，来实现“订阅-发布”功能。

```python
class Event:
  def __init__(self):
    self.client_list = {}
  
  def listen(self, key, fn):
    if key not in self.client_list:
      self.client_list[key] = []
    self.client_list[key].append(fn)
  
  def trigger(self, *args, **kwargs):
    fns = self.client_list[args[0]]

    length = len(fns)
    if not fns or length == 0:
      return False
    
    for fn in fns:
      fn(*args[1:], **kwargs)
    
    return False

  def remove(self, key, fn):
    if key not in self.client_list or not fn:
      return False
    
    fns = self.client_list[key]
    length = len(fns)

    for _fn in fns:
      if _fn == fn:
        fns.remove(_fn)
    
    return True

# 借助继承为对象安装 发布-订阅 功能
class SalesOffice(Event):
  def __init__(self):
    super().__init__()

# 根据自己需求定义一个函数：供事件处理完后调用
def handle_event(event_name):
  def _handle_event(*args, **kwargs):
    print("Price is", *args, "at", event_name)
  
  return _handle_event


if __name__ == "__main__":
  # 创建2个回调函数
  fn1 = handle_event("event01")
  fn2 = handle_event("event02")

  sales_office = SalesOffice()

  # 订阅event01 和 event02 这2个事件，并且绑定相关的 完成后的函数
  sales_office.listen("event01", fn1)
  sales_office.listen("event02", fn2)

  # 当两个事件完成时候，触发前几行绑定的相关函数
  sales_office.trigger("event01", 1000)
  sales_office.trigger("event02", 2000)

  sales_office.remove("event01", fn1)

  # 打印：False
  print(sales_office.trigger("event01", 1000))
```

## 4. 参考

- [维基百科·订阅-发布模式](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)
- [观察者模式和订阅-发布模式的不同](https://www.zhihu.com/question/23486749)
- 《JavaScript 设计模式和开发实践》