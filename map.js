Array.prototype.Map=function(fn,context){
    var arr=[].slice.call(this);
    var result_arr=[];
    for(var i=0;i<arr.length;i++){
        result_arr.push(fn.call(context,arr[i],i,this));
    }
    return result_arr;
}