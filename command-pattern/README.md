---
title: "命令模式"
---

## 1. 什么是“命令模式”？

> 命令模式是一种数据驱动的设计模式，它属于行为型模式。

1. 请求以命令的形式包裹在对象中，并传给调用对象。
2. 调用对象寻找可以处理该命令的合适的对象，并将其传给命令对象。
3. 命令对象执行命令。

## 2. 应用场景

有时候需要向某些对象发送请求，但是又不知道请求的接受者是谁，更不知道被请求的操作是什么。此时，**命令模式就是以一种松耦合的方式来设计程序**。

## 3. 代码实现

### 3.1 ES6 实现

`Order`是抽象的命令对象，`RefreshOrder`和`LoadOrder`具体实现了Order命令。

`Caller`是命令调度者，来选择合适的命令对象。

```javascript
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
```

下面是同级目录的html代码，在谷歌浏览器中打开创建的`index.html`，并且打开控制台，即可看到效果。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>命令模式</title>
</head>
<body>
  <button>按钮</button>
  <script src="./main.js"></script>
</body>
</html>
```

### 3.2 python3实现

命令对象将动作的接收者设置在属性中，并且对外暴露了`execute`接口（按照习惯约定）。

在其他类设置命令并且执行命令的时候，只需要按照约定调用`Command`对象的`execute()`即可。到底是谁接受命令，并且怎么执行命令，都交给`Command`对象来处理！

```python
__author__ = 'godbmw.com'

# 接受到命令，执行具体操作
class Receiver(object):
  def action(self):
    print("按钮按下，执行操作")

# 命令对象
class Command:
  def __init__(self, receiver):
    self.receiver = receiver
  
  def execute(self):
    self.receiver.action()

# 具体业务类
class Button:
  def __init__(self):
    self.command = None
  
  # 设置命令对戏那个
  def set_command(self, command):
    self.command = command
  
  # 按下按钮，交给命令对象调用相关函数
  def down(self):
    if not self.command:
      return 
    self.command.execute()

if __name__ == "__main__":

  receiver = Receiver()
  
  command = Command(receiver)
  
  button = Button()
  button.set_command(command)
  button.down()
```


## 4. 参考

- 《JavaScript 设计模式和开发实践》
- [如何实现命令模式](https://www.yiibai.com/python_design_patterns/python_design_patterns_command.html)
