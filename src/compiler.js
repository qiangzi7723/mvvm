import Watcher from './watcher';

const Compiler = function (option) {
    this.option = option;
    this.el = this.option.el;
    if (typeof this.el === 'string') {
        this.el=document.querySelector(this.el)
    }
    this.compile();
}

Compiler.prototype.compile=function(){
    const nodeList=this.el.children;
    Array.from(nodeList).forEach(node=>{
        const attrs=Array.from(node.attributes);
        attrs.forEach(attr=>{
            if(attr.name.startsWith('v-')){
                // 说明当前元素绑定了指令
                const exp=attr.value;
                const dir=attr.name.slice(2);
                directive[dir]&&directive[dir](node,exp,this.option.data);
            }
        })        
    });
}

const directive={
    model(node,exp,data){
        // 初始化时取值
        node.value=data[exp];
        new Watcher(data,exp,()=>{
            node.value=data[exp];
        });
    }
}


export default Compiler;