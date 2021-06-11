import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authSuccess=(token,userId)=>{
    return({
        type:actionTypes.AUTH_SUCCESS,
        payload:{
            token:token,
            userId:userId
        }
    })
}

export const authLoading=isLoading=>{
    return({
        type:actionTypes.AUTH_LOADING,
        payload:isLoading
    })
}


export const authFailed=errMsg=>{
    return({
        type:actionTypes.AUTH_FAILED,
        payload:errMsg
    })
}

export const logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('expireTime')
    localStorage.removeItem('userId')
    return({
        type:actionTypes.AUTH_LOGOUT,
        
    })
}



export const auth = (email, password, mode) => dispatch => {

    dispatch(authLoading(true))
    // console.log('AuthMode:', mode)
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }
    let authUrl = null
    if (mode === 'SignUp') {
        authUrl='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='

        
    }
    else {

        authUrl='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
        
    }
    let API_KEY='AIzaSyARfJBX6ekldhYkv36xubqq8xOuGn0Rjrc'
    axios.post(authUrl + API_KEY , authData)
        .then(response => {
            dispatch(authLoading(false))
            localStorage.setItem('token',response.data.idToken)
            localStorage.setItem('userId',response.data.localId)
            const expireTime= new Date(new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('expireTime',expireTime)
            // console.log('Response:',response)
            dispatch(authSuccess(response.data.idToken,response.data.localId))
        })
        .catch(err=>{
            dispatch(authLoading(false))
            console.log('err:',err.response.data.error.message)
            dispatch(authFailed(err.response.data.error.message))
        })
    
   
}


export const authCheck=()=>dispatch=>{
    let token=localStorage.getItem('token');
    let userId=localStorage.getItem('userId')
    let expireTime=localStorage.getItem('expireTime')
    if(token===null){
        //logout
        dispatch(logout())
    }
    else{
        if(new Date()>expireTime){
            // log out
            dispatch(logout())
        }
        else{
            dispatch(authSuccess(token,userId))
        }
    }
}

