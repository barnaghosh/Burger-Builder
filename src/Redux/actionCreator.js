import axios from 'axios'
import * as actionTypes from './actionTypes'

export const addIngradiant=igType=>{
    return({
        type:actionTypes.ADD_INGRADIANT,
        payload:igType
    })
}

export const removeIngradiant=igType=>{
    return({
        type:actionTypes.REMOVE_INGRADIANT,
        payload:igType
    })
}

export const updateIngradiant=()=>{
    return({
        type:actionTypes.UPDATE_PURCHASEABLE,
        
    })
}

export const resetIngradiant=()=>{
    return({
        type:actionTypes.RESET_INGRADIANTS,
        
    })
}

export const loadOrder=order=>{
    return{
        type:actionTypes.LOAD_ORDERS,
        payload:order
    }
}

export const loadFailed=(msg)=>{
    return{
        type:actionTypes.ORDER_LOAD_FAILED,
        payload:msg
    }
}

export const fetchOrder=(token,userId)=>dispatch=>{
    const queryParams = '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('https://burger-builder-37b25-default-rtdb.firebaseio.com/orders.json?auth=' + token +queryParams)
    .then(response=>{
       dispatch(loadOrder(response.data)) 
    })
    .catch(err=> {
        console.log('Error:',err.message)
        dispatch(loadFailed(err.message))
    })
}