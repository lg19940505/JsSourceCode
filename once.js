function once(fn){
    let result;
    let count=0;
    return function(){
        count++;
        if(count==1){
            result=fn.apply(this,[].slice.call(arguments))
        }
        return result;
    }
}
var x=2;
let t= once(function(n){
    return x+n;
})(2)
