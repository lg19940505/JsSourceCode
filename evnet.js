class my_event{
    constructor(){
        this.eventList={};
    }
    add_event(eventName,fn){
        if(!this.eventList[eventName]){
            this.eventList[eventName]=[];
        }
        this.eventList[eventName].push(fn);
    }
    remove_event(eventName,fn){
        for(let i=0;i<this.eventList[eventName].length;i++){
            if(this.eventList[eventName][i]==fn){
                this.eventList[eventName].splice(i,1);
            }
        }
    }
    do_event(eventName){
        this.eventList[eventName].forEach(fn => {
            fn();
        });
    }
}

let e=new my_event();
e.add_event('1',()=>console.log('1'))
e.add_event('1',()=>console.log('11'))
e.do_event('1')