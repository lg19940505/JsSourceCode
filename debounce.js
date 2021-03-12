function debounce (fn,delay,immediate){
    let timer=null;
    return (...args)=>{
         
        clearTimeout(timer)
        if (immediate) {
            //定义callNow = !timer
            var callNow = !timer;
            //定义wait时间后把timer变为null
            //即在wait时间之后事件才会有效
            timer = setTimeout(() => {
                timer = null;
            }, wait)
            //如果callNow为true,即原本timer为null
            //那么执行func函数
            if (callNow) func.apply(this, args)
        } else {
            //如果是不立即执行
            //那就是每次重新定时
            timer = setTimeout(function () {
                func.apply(this, args)
            }, wait);
        }
    }
}