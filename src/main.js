import mvvm from './mvvm';

const vm=new mvvm({
    data:{
        something:'Good'
    },
    el:'#app'
})

window.vm=vm;