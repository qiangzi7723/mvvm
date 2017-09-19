import Compiler from './compiler';
import Observer from './observe';

const mvvm = function(option){
    this.option=option;
    new Observer(this.option.data);
    new Compiler(this.option);
}


export default mvvm;