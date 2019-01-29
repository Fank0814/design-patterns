class Order {
  execute() {
    throw new Error('Empty Method');
  }
}

class RefreshOrder extends Order {
  constructor() {
    super();
  }

  execute() {
    console.log('刷新页面')
  }
}

class LoadOrder extends Order {
  constructor() {
    super();
  }

  execute() {
    console.log('加载数据')
  }
}

class Caller {
  constructor() {
    this.orders = [];
  }

  add(order) {
    this.orders.push(order);
  }

  click() {
    // 寻找处理click指令的 命令对象
    // 为了方便展示, 这里直接调用所有命令对象
    this.orders.forEach(order => order.execute());
  }
}

/*********** 以下是测试代码 *********/
const caller = new Caller();
caller.add(new LoadOrder());
caller.add(new RefreshOrder());

const button = document.querySelector('button');
button.addEventListener('click', () => caller.click());
