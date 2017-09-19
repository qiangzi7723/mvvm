import Dep from './dep';

const Observer=function(data){
    Object.keys(data).forEach(key=>{
        this.observe(data,key,data[key]);
    })
}

Observer.prototype.observe=function(data,key,val){
    let value=val;
    const dep=new Dep();
    Object.defineProperty(data,key,{
        get(){
            if(Dep.target){
                dep.add(Dep.target);
            }
            return value;
        },
        set(newValue){
            if(value!==newValue){
                // 值发生改变
                value=newValue;
                dep.notify();
            }
        }
    })
}

export default Observer;