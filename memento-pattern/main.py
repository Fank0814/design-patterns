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
  