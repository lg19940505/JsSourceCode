Array.prototype.reduce=function(fn,value){
    var arr=[].slice.call(this);
    var res,index;
    res=value?value:arr[0];
    index=value?0:1;
    for(var i=index;i<arr.length;i++){
        res=fn.call(null,res,arr[i],i,this);
    }
    return res;
}