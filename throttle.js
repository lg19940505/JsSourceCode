function throttle(fn,delay=500) {
    let flag =true;
    return (...args)=> {
        if(!flag) return;
        flag=false;
        setTimeout(() => {
            fn.apply(this,[].slice.apply(this, args))
            flag=true;
        }, delay);
    }
}