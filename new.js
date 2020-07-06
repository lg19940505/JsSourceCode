function myNew(){
    //1、获取构造函数，同时删除arguments中第一个参数,同时得到构造函数
    Con=[].shift.call(arguments);
    //2、创建一个空的对象并链接到原型，obj可以访问构造函数中的原型中的属性
    let obj=Object.create(Con.prototype);
    //3、绑定this实现继承，obj可以访问到构造函数中的属性
    let ret=Con.apply(obj,arguments);
    //4、优先返回构造函数返回的额对象
    return ret instanceof Object?ret:obj;
}
