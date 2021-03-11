function create(proto){
    let f=function(){};
    f.prototype=proto;
    f.prototype.constructor=f;
    return new f();
}