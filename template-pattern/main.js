class Animal {
  constructor() {
    this.live = () => {
      this.eat();
      this.sleep();
    };
  }

  eat() {
    throw new Error("模板类方法必须被重写");
  }

  sleep() {
    throw new Error("模板类方法必须被重写");
  }
}

class Dog extends Animal {
  constructor(...args) {
    super(...args);
  }
  eat() {
    console.log("狗吃粮");
  }
  sleep() {
    console.log("狗睡觉");
  }
}

class Cat extends Animal {
  constructor(...args) {
    super(...args);
  }
  eat() {
    console.log("猫吃粮");
  }
  sleep() {
    console.log("猫睡觉");
  }
}

/********* 以下为测试代码 ********/

let dog = new Dog();
dog.live();

let cat = new Cat();
cat.live();
