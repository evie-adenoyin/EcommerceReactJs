import {
    GET_USER,
    CREATE_STORE,
    GET_STORE,
    USER_LOADING
} from '../types/userTypes'

import axios from 'axios'


const getUser= (data) =>{
    return {
     type : GET_USER,
     payload : data
    }
 }

const createStore= (data) =>{
    return {
     type : CREATE_STORE,
     payload : data
    }
 }

const getStore= (data) =>{
    return {
     type : GET_STORE,
     payload : data
    }
 }
const userLoading= (data) =>{
    return {
     type : USER_LOADING,
     payload : data
    }
 }



 export const getUserAction= (id)=> async (dispatch)=>{
    dispatch(userLoading())

    const  config = {
        headers:{
          'Content-Type':'application/json',
          "Accept-Encoding": "gzip,deflate,compress"
        }
    }

    await axios.get(`${process.env.SERVER_URL}api/user/${id}`, config)
    .then(res=>{
        dispatch(getUser(res.data))
    })
 }


 export const getStoreAction= (id)=> async (dispatch)=>{
    dispatch(userLoading())

    const  config = {
        headers:{
          'Content-Type':'application/json',
          "Accept-Encoding": "gzip,deflate,compress"
        }
    }

    await axios.get(`${process.env.SERVER_URL}api/store/${id}`, config)
    .then(res=>{
        dispatch(getStore(res.data))
    })
 }


 export const createStoreAction= (dataForm)=> async (dispatch)=>{
    dispatch(userLoading())

    const  config = {
        headers:{
          'Content-Type':'application/json',
          "Accept-Encoding": "gzip,deflate,compress"
        }
    }

    await axios.get(`${process.env.SERVER_URL}api/store/`,dataForm,  config)
    .then(res=>{
        dispatch(createStore(res.data))
    })
 }