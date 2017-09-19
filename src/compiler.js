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
    // v-model钩子的处理
    model(node,exp,data){
        this.combind(node,exp,data,'model');
        // input输入绑定
        node.addEventListener('input',e=>{
            this.setValue(data,exp,e.target.value);
        },false);
    },
    text(node,exp,data){
        this.combind(node,exp,data,'text');
    },
    html(node,exp,data){
        this.combind(node,exp,data,'html');
    },
    combind(node,exp,data,dir){
        let val=this.getValue(exp,data);
        updater[dir]&&updater[dir](node,val);
        new Watcher(data,exp,()=>{
            updater[dir]&&updater[dir](node,this.getValue(exp,data));
        });
    },
    getValue(exp,data){
        // parent.some
        const exps=exp.split('.');
        let val=data;
        exps.forEach(key=>{
            val=val[key];
        })
        return val;
    },
    setValue(data,exp,target){
        const exps=exp.split('.');
        let val=data;
        const len=exps.length;
        exps.forEach((key,index)=>{
            if(index<len-1){
                val=val[key];
            }else{
                val[key]=target;
            }
        })
    }

}

const updater={
    model(node,val){
        node.value=val;
    },
    text(node,val){
        node.textContent=val;
    },
    html(node,val){
        node.innerHTML=val;
    }
}


export default Compiler;