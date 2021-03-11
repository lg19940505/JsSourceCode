function depClone(source){
    if(typeof source !='object'||source === null) return source;//不是对象 直接返回
    //判断是不是数组
    let obj= source instanceof Array?[]: {};
     
    // Reflect.ownKeys包括了Symbol
    for(let key of Reflect.ownKeys(source)){
        obj[key] =depClone(source[key]);
    }
    return obj;
}
let sy= Symbol('s');
 
let s={
    a:{b:1},
    s:[1,2,3],
    c:{
        d:[2,3]
    },
    [sy]:'ss'
}

let n=depClone(s);

