from inspect import isfunction

# for_each 起到了“桥”的作用
def for_each(arr, callback):
  if isinstance(arr, list) == False or isfunction(callback) == False:
    return
  
  for (index, item) in enumerate(arr):
    callback(item, index)

# 具体实现部分
def callback(item, index):
  print('元素是', item, '; 它的位置是', index)

# 以下是测试代码
if __name__ == '__main__':
  arr = ['a', 'b']
  
  for_each(arr, callback)
  