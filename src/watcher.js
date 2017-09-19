import Dep from './dep'

const Watcher=function(data,exp,cb){
    this.data=data;
    this.exp=exp;
    this.cb=cb;
    this.watch();
}

Watcher.prototype.watch=function(){
    // 依赖收集
    Dep.target=this;
    // 通过get收集依赖 因为dep对象存在闭包当中
    this.data[this.exp];
    Dep.target=null;
}

Watcher.prototype.update=function(){
    this.cb();
}

export default Watcher;