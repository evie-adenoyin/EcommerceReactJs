import React from 'react'
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_FAIL,
    LOGIN_SUCCESSFUL,
    LOGIN_FAILED,
    LOGOUT_SUCCESSFUL,
    REGISTRATION_SUCCESSFUL,
    REGISTRATION_FAILED,
} from '../types/authTypes.js'

import axios from 'axios'


// Action creators 
const userLoading = () =>{
  return {
    type:USER_LOADING
  }
}

const userLoaded = (data) =>{
  return {
    type:USER_LOADED,
    payload : data
  }
}

const registrationsuccessful = (data) =>{
  return {
    type:REGISTRATION_SUCCESSFUL,
    payload : data
  }
}

const registrationFailed = (data) =>{
  return {
    type:REGISTRATION_FAILED,
    payload : data
  }
}

const loginSuccessful = (data) =>{
  return {
    type:LOGIN_SUCCESSFUL,
    payload : data
  }
}

const loginFailed = (data) =>{
  return {
    type:LOGIN_FAILED,
    payload : data
  }
}

const logout = (data) =>{
  return {
    type:LOGOUT_SUCCESSFUL,
    payload : data
  }
}



// Thunk async action creators 
export const userLoadingAction = () =>async (dispatch) =>{
  dispatch(userLoading())
  const  config = {
    headers:{
      'Content-Type':'application/json',
      "Accept-Encoding": "gzip,deflate,compress"
    }
  }

  await axios.get(`${process.env.SERVER_URL}api/user/`, config)
  .then(res=>{
    dispatch(userLoaded(res.data))
  })

}


export const userregisterAction = (data) =>async (dispatch) =>{
  const  config = {
    headers:{
      'Content-Type':'application/json',
      "Accept-Encoding": "gzip,deflate,compress"
    }
  }

  await axios.post(`${process.env.SERVER_URL}api/user/`, data, config)
  .then(res=>{
     axios.post(`${process.env.SERVER_URL}api/cart/`,{'userid':res.data?.id, 'quantity':0}, config)
    .then(res=>{
      dispatch(registrationsuccessful(res.data))
    })
  })
  .catch(err=>{
    dispatch(registrationFailed(err.response.data))
  })

}


export const userloginAction = (email, password) =>async (dispatch) =>{
  const  config = {
    headers:{
      'Content-Type':'application/json',
      "Accept-Encoding": "gzip,deflate,compress"
    }
  }

  await axios.get(`${process.env.SERVER_URL}api/login/${email}/`, config)
  .then(res=>{
    if(res.data.length === 0 ){
      dispatch(loginFailed(res.response.data))
    }
    else{
      let emailDB = res.data[0]?.email
      let passwordDB = res.data[0]?.password

      if (emailDB === email && passwordDB === password){
        dispatch(loginSuccessful(res.data[0]))
      }
      else{
        dispatch(loginFailed(res.response.data))
      }
    }
  })
  .catch(err=>{
    dispatch(loginFailed(err.response.data))
  })

}

export const userLogoutAction = () =>async (dispatch) =>{
  dispatch(logout('Successfully logout out'))
}