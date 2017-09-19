import mvvm from './mvvm';

const vm=new mvvm({
    data:{
        // something:'Good',
        // some:'Bad',
        // someText:'Text',
        // someHtml:'<p>我是p标签</p>',
        parent:{
            some:'Good'
        }
    },
    el:'#app'
})

window.vm=vm;