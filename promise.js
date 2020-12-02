class MyPromise {
    constructor(constructorCallback) {
        let _this = this
        _this.status = 'pending'
        _this.value = ''
        _this.onFullfiledCallback = []
        _this.onRejectedCallback = []

        function resolveFn(result) {
            let timer = setTimeout(() => {
                clearTimeout(timer)
                if (_this.status === 'pending') {
                    _this.status = 'resolved'
                    _this.value = result
                    _this.onFullfiledCallback.forEach(el => el(_this.value));
                }
            })


        }

        function rejectFn(reason) {
            let timer = setTimeout(() => {
                clearTimeout(timer)
                if (_this.status === 'pending') { //状态只能是从pending到失败
                    _this.status = 'rejected'
                    _this.value = reason
                    _this.onRejectedCallback.forEach(el => el(_this.value));
                }
            })


        }
        constructorCallback(resolveFn, rejectFn)
    }
    then(onFullfiled, onRejected) {
        let promise2 = new MyPromise((resolve, reject) => {
            if (this.status === 'resolved') {
                let x = onFullfiled(this.value)
                resolvePromise(promise2, x, resolve, reject)
            }
            if (this.status === 'rejected') {
                let x = onRejected(this.value)
                resolvePromise(promise2, x, resolve, reject)
            }
            if (this.status === 'pending') {
                this.onFullfiledCallback.push(() => {
                    let x = onFullfiled(this.value)
                    resolvePromise(promise2, x, resolve, reject)
                })
                this.onRejectedCallback.push(() => {
                    let x = onRejected(this.value)
                    resolvePromise(promise2, x, resolve, reject)
                })
            }
        })
        return promise2
    }

    //all 获取所有的promise，都执行then，把结果放到数组，一起返回
    static all(promiseArr = []) {
        return new Promise((resolve, reject) => {
            let index = 0;
            let arr = []
            for (let i = 0; i < promiseArr.length; i++) {
                promiseArr[i].then(result => {
                    index++
                    arr[i] = result
                    if (index === arr.length) {
                        resolve(arr)
                    }
                }, reason => {
                    reject(reason)
                })
            }
        })
    }
    //谁先执行先返回谁
    static race(promises) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(resolve, reject)
            };
        })
    }
    //resolve方法 
    static resolve(result) {
        return new Promise((resolve, reject) => {
            resolve(result)
        });
    }
    //reject方法 
    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        });
    }

}

function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) { // 循环引用报错 
        return reject(new TypeError(''))
    }
    let called; //控制调用次数
    // x不是null 且x是对象或者函数   
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then; // PromiseA+规定，声明then 等于 x的then方法  
            // 如果then是函数，就默认是promise了     
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject)
                }, err => {
                    if (called) return;
                    called = true;
                    reject(err);
                })
            } else { //如果不是函数，是普通对象直接resolve
                resolve(x); // 直接成功即可 
            }
        } catch (e) {
            // 如果在执行的过程中报错了，就被then的失败捕获       
            if (called) return;
            called = true; // 取then出错了那就不要在继续执行了       
            reject(e);
        }

    } else {
        resolve(x);
    }

}
let p1 = new MyPromise((resolve, reject) => {
    resolve('执行成功')
    reject('执行失败')
})
p1.then(v => {
    console.log("v" + v)
}, r => {
    console.log("r" + r)
})
