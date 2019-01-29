// 抽象部分
const forEach = (arr, callback) => {
  if (
    !Array.isArray(arr) ||
    typeof callback !== 'function'
  ) return;

  const length = arr.length;
  for (let i = 0; i < length; ++i) {
    callback(arr[i], i);
  }
};

/**************以下是测试代码**************/
let arr = ["a", "b"];
// 回调函数是具体实现部分
forEach(arr, (el, index) => console.log("元素是", el, "位于", index));
