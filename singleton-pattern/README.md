---
title: "单例模式"
---

## 1. 什么是单例模式？

> 单例模式定义：保证一个类仅有一个实例，并提供访问此实例的全局访问点。

## 2. 单例模式用途

如果一个类负责连接数据库的线程池、日志记录逻辑等等，**此时需要单例模式来保证对象不被重复创建，以达到降低开销的目的。**

## 3. 代码实现

需要指明的是，以下实现的单例模式均为 **惰性单例**。

它只有在用户需要的时候才会创建对象实例。

### 3.1 ES6 实现

```javascript
const getSingleton = (className) => {
  let singleton = null;
  return () => {
    // 检查是否存在实例
    // 如果不存在, 那么创建
    if(!singleton) singleton = new className();
    return singleton;
  }
};

/*********** 以下是测试代码 ***********/
// 为了方便展示, 这里定义一个空类
class Demo {};

// 创建指定类的单例生成函数
let getDemoSingleton = getSingleton(Demo);

let d1 = getDemoSingleton(),
  d2 = getDemoSingleton();

// 输出 true
console.log(d1 === d2);
```

### 3.2 python3 实现

```python
class Singleton:
  # 将实例作为静态变量
  __instance = None

  @staticmethod
  def get_instance():
    if Singleton.__instance == None:
      # 如果没有初始化实例，则调用初始化函数
      # 为Singleton生成 instance 实例
      Singleton()
    return Singleton.__instance

  def __init__(self):
    if Singleton.__instance != None:
      raise Exception("请通过get_instance()获得实例")
    else:
      # 为Singleton生成 instance 实例
      Singleton.__instance = self

if __name__ == "__main__":

  s1 = Singleton.get_instance()
  s2 = Singleton.get_instance()

  # 查看内存地址是否相同
  print(id(s1) == id(s2))
```
