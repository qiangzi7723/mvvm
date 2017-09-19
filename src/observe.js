import Dep from './dep';

const Observer=function(data){
    Object.keys(data).forEach(key=>{
        this.observe(data,key,data[key]);
        if(typeof data[key]==='object'&&typeof data[key]!==null){
            // 说明数据是对象 不是基本值 需要进行递归
            new Observer(data[key]);
        }
    })
}

Observer.prototype.observe=function(data,key,val){
    let value=val;
    const dep=new Dep();
    console.log(dep);
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