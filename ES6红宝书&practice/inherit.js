/* 
继承
1、原型链继承
  关键是子类的原型等于父类的构造函数创建的实例
  存在缺点：多个实例对引用类型的操作会被篡改
*/
function SuperType(){
    this.colors = ['red','blue','yellow']
    this.property = true
  }
  SuperType.prototype.getSuperValue = function(){
    return this.property
  }
  function SubType(){
    this.subProperty = false
  }
  SubType.prototype = new SuperType()
  SubType.prototype.getSubValue = function(){
    return this.subProperty
  }
  var instance = new SubType();
  console.log(instance.getSuperValue()); // true
  
  //缺点
  instance.colors.push('black')
  console.log(instance.colors)
  var instance2 = new SubType()
  console.log(instance2.colors)
  /* 
  2、 借用构造函数继承
    借用父类的构造函数来增强子类的实例，等同于复制父类的实例给子类
  */
  function SuperType(){
    this.colors = ['red','blue','yellow']
    this.property = true
  }
  SuperType.prototype.getSuperValue = function(){
    return this.property
  }
  function SubType(){
    SuperType.call(this)
    this.subProperty = false
  }
  var instance1 = new SubType()
  instance1.colors.push("black")
  var instance2 = new SubType()
  instance1.getSuperValue()
  //缺点：只能复制父类的实例和属性，不能复制原型上的方法和属性
  //     无法实现复用，每个子类都有父类实例函数的副本，影响性能
  
  /* 
  3、组合式继承 
    原型链和借用构造函数两种方法的结合
  */
  function SuperType(name){
    this.name = name
    this.colors = ['red','blue','yellow']
  }
  
  function SubType(name, age){
    SuperType.call(this, name)
    this.age = age
  }
  
  SubType.prototype = new SuperType()
  //缺点，：创建的实例上有同名的属性和方法
  /* 
  4、原型式
    将一个空对象作为中介，将一个对象赋值给空对象构造函数的原型
  */
  function object(obj){
    function F(){}
    F.property = obj
    return new F()
  }
  
  /* 
  5、寄生式继承
  核心：在原型式继承的基础上，增强对象，返回构造函数
   */
  function createAnother(original){
    var clone = object(original)
    clone.say = function() {
      console.log('say hello')
    }
    return clone;
  }
  /* 
  6、寄生组合式继承
  结合借用构造函数传递参数和寄生模式实现继承
   */
  function inheritPrototype(SubperType, SubType) {
    var prototype = Object.create(SuperType.prototype)
    prototype.constructor = SubType
    SubType.prototype = prototype 
  }
  function SuperType(name) {
    this.name = name
    this.colors = ['red','blue','yellow']
  }
  SuperType.prototype.sayName = function() {
    console.log('父类' + this.name)
  }
  
  function SubType(name, age) {
    SuperType.call(this, name)
    this.age = age
  }
  inheritPrototype(SuperType, SubType)
  
  SubType.prototype.sayAge = function() {
    console.log('子类' + this.age)
  }
  var instance1 = new SubType("aney", 20);
  var instance2 = new SubType("luck", 18);
  
  instance1.colors.push("2"); // ['red','blue','yellow','2']
  instance1.colors.push("3"); // ['red','blue','yellow','3']
  /* 
  这个例子的高效率体现在它只调用了一次SuperType 构造函数，
  并且因此避免了在SubType.prototype 上创建不必要的、多余的属性。
  于此同时，原型链还能保持不变；因此，还能够正常使用instanceof 和isPrototypeOf()
  这是最成熟的方法，也是现在库实现的方法
   */
  /* 
  7、 混入方式继承多个对象 ----后两个例子yymind
  */
  function MyClass() {
    SuperClass.call(this);
    OtherSuperClass.call(this);
  }
  
  // 继承一个类
  MyClass.prototype = Object.create(SuperClass.prototype);
  // 混合其它
  Object.assign(MyClass.prototype, OtherSuperClass.prototype);
  // 重新指定constructor
  MyClass.prototype.constructor = MyClass;
  
  MyClass.prototype.myMethod = function() {
    // do something
  }
  
  
  
  /* 
  8、ES6类继承extends
   */
  
  class Rectangle {
    constructor(height, width) {
      this.height = height;
      this.width = width;
    }
    // Getter
    get area() {
      return this.calcArea()
    }
    // Method
    calcArea() {
        return this.height * this.width;
    }
  }
  
  // 继承
  class Square extends Rectangle {
    constructor(length) {
      super(length, length);
      // 如果子类中存在构造函数，则需要在使用“this”之前首先调用 super()。
      this.name = 'Square';
    }
    get area() {
      return this.height * this.width;
    }
  }
  
  // 输出 100
  
  
  //pollify-extends
  function _inherits(subType, superType) {
    
    // 创建对象，创建父类原型的一个副本
    // 增强对象，弥补因重写原型而失去的默认的constructor 属性
    // 指定对象，将新创建的对象赋值给子类的原型
    subType.prototype = Object.create(superType && superType.prototype, {
        constructor: {
            value: subType,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    
    if (superType) {
        Object.setPrototypeOf 
            ? Object.setPrototypeOf(subType, superType) 
            : subType.__proto__ = superType;
    }
  }
  
  // 寄生组合式--现有库的实现方式
  function inheritPrototype(SubType, SuperType){
    var prototype = Object.create(SuperType.prototype)
    prototype.constructor = SubType
    SubType.prototype = prototype
  }
  function SuperType(name){
    this.name = name
  }
  SuperType.prototype.sayName = function(){
    alert(this.name)
  }
  function SubType(name, age) {
    SuperType.call(this, name)
    this.age = age
  }
  SubType.prototype.sayAge = function() {
    console.log(this.age)
  }