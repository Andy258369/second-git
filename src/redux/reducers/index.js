import {mbx} from '../constants'
const initailValue={
    menuName:'首页'
}
const Reducer=(state=initailValue,action)=>{
    switch(action.type){
        case mbx:
            return {menuName:action.menuName};
        default:
            return state;
    }
}
export default Reducer