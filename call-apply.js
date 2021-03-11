Function.prototype.call=function(context,...args){
    let func=this;
    let fn=Symbol('fn');
    context[fn]=func;
    let result=context[fu](...args);
    delete context[fn]
    return result;
}
Function.prototype.call=function(context,...args){
    let func=this;
    let fn=Symbol('fn');
    context[fn]=func;
    let result=context[fu](args);
    delete context[fn]
    return result;
}