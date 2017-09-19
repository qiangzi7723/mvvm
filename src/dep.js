let DepId=0;
const Dep=function(){
    this.id=DepId++;
    this.sub=[];
}

Dep.prototype.add=function(watcher){
    this.sub.push(watcher);
}

Dep.prototype.notify=function(){
    this.sub.forEach(watcher=>{
        watcher.update();
    })
}

export default Dep;