import Dep from './dep'

const Watcher=function(data,exp,cb){
    this.data=data;
    this.exp=exp;
    this.cb=cb;
    this.watch();
}

Watcher.prototype.watch=function(){
    const exps=this.exp.split('.');
    let val=this.data;
    // 依赖收集
    Dep.target=this;
    exps.forEach(key=>{
        val=val[key];
    })
    // 通过get收集依赖 因为dep对象存在闭包当中
    Dep.target=null;
}

Watcher.prototype.update=function(){
    this.cb();
}

export default Watcher;