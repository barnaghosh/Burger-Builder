import * as actionTypes from './actionTypes';

const INGRADIENT_PRICE = {
    salad: 20,
    cheese: 40,
    meat: 90,
}

const INITIAL_STATE = {
    ingradiants: [
        { type: 'salad', amount: 0 },
        { type: 'cheese', amount: 0 },
        { type: 'meat', amount: 0 },
    ],
    totalPrice: 80,
    order:[],
    orderLoading:true,
    orderErr:false,
    ErrMsg:'',
    purchasable: false,
    token:null,
    userId:null,
    authLoading:false,
    authFailedMsg:null
}
export const reducer = (state = INITIAL_STATE, action) => {

    console.log('ReducerAction,', action)

    if(action.type === actionTypes.ADD_INGRADIANT){
        const ingradients=[...state.ingradiants]
        
        
        let item;
        for(item of ingradients){
           
            if(item.type=== action.payload){
                item.amount++
            }
            
        }
        return({
            ...state,
            ingradiants:ingradients,
            totalPrice:state.totalPrice + INGRADIENT_PRICE[action.payload],
            
        })
        
    }
    if(action.type === actionTypes.REMOVE_INGRADIANT){
        
         const ingradients=[...state.ingradiants]
         
 
         let item;
         for(item of ingradients){
             
             if(item.type=== action.payload){
                 if(item.amount>0){
                     item.amount--
                     let totalPrice=state.totalPrice - INGRADIENT_PRICE[action.payload]
                     return({
                         ingradiants:ingradients,
                         totalPrice:totalPrice,
                         
                     })
 
                     
                 }
             }
            
            
         }
    }

    if(action.type === actionTypes.UPDATE_PURCHASEABLE){
        const sum=state.ingradiants.reduce((sum,element)=>{
            return sum+element.amount
        },0)
        return({
            ...state,
            purchasable:sum>0
        })
    }
    if(action.type === actionTypes.RESET_INGRADIANTS){
        return({
            ...state,
            ingradiants: [
                { type: 'salad', amount: 0 },
                { type: 'cheese', amount: 0 },
                { type: 'meat', amount: 0 },
            ],
            totalPrice: 80,
            purchasable: false,
        })
    }

    if(action.type === actionTypes.LOAD_ORDERS){
        // console.log('LoadOrder:',action.payload)
        let orders=[]
        for(let key in action.payload){
            orders.push(
                {
                    ...action.payload[key],
                    id:key
                }
                

            )
        }
        // console.log('Orders:',orders)
        return({
            ...state,
            order:orders,
            orderLoading:false
        })
    }
    if(action.type === actionTypes.ORDER_LOAD_FAILED){
        return({
            ...state,
            orderLoading:false,
            orderErr:true,
            ErrMsg: action.payload
        })
    }
    if(action.type === actionTypes.AUTH_SUCCESS){
        return({
            ...state,
            token:action.payload.token,
            userId:action.payload.userId
        })
    }
    if(action.type===actionTypes.AUTH_LOGOUT){
        return({
            ...state,
            authFailedMsg:null,
            token:null,
            userId:null
        })
    }
    if(actionTypes.AUTH_LOADING===action.type){
        return({
            ...state,
            authLoading:action.payload
        })
    }
    if(actionTypes.AUTH_FAILED===action.type){
        return({
            ...state,
            authFailedMsg:action.payload
        })
    }
    
    return state
   

}