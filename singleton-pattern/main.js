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
