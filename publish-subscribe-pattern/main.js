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
