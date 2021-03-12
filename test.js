function fn() {
    let arr=[].slice.call(arguments);
    console.log(arr.length||5);
}
fn()
fn(1,2,3)