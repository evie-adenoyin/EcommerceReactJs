import {
    FILTER_PRICE,
    FILTER_RATING,
    FILTER_CONDITION,
    FILTER_PRICE_AND_RATING,
    FILTER_PRICE_AND_CONDITION,
    FILTER_RATING_AND_CONDITION,
    FILTER_ALL,
    FILTER_LOADING
} from '../types/filterTypes'

import axios from 'axios'


const filterPrice= (data) =>{
   return {
    type : FILTER_PRICE,
    payload : data
   }
}

const filterRating= (data) =>{
   return {
    type : FILTER_RATING,
    payload : data
   }
}

const filterCondition= (data) =>{
   return {
    type : FILTER_CONDITION,
    payload : data
   }
}

const filterPriceAndRating= (data) =>{
   return {
    type : FILTER_PRICE_AND_RATING,
    payload : data
   }
}

const filterPriceAndCondition= (data) =>{
   return {
    type : FILTER_PRICE_AND_CONDITION,
    payload : data
   }
}

const filterRatingAndCondition= (data) =>{
   return {
    type : FILTER_RATING_AND_CONDITION,
    payload : data
   }
}

const filterAll= (data) =>{
   return {
    type : FILTER_ALL,
    payload : data
   }
}

const filterLoading= () =>{
   return {
    type : FILTER_LOADING,
   }
}


export const filterPriceAction = (minprice,maxprice) => async (dispatch)=>{
    dispatch(filterLoading())
    const  config = {
        headers:{
          'Content-Type':'application/json',
          "Accept-Encoding": "gzip,deflate,compress"
        }
    }
    
    let url;

    if (minprice && maxprice){
        url = `api/filter/price/${minprice}/${maxprice}/`
    }else if(minprice && maxprice === ''){
        url = `api/filter/price/min/${minprice}/`
    }else{
        url = `api/filter/price/max/${maxprice}/`
    }

    await axios.get(`${process.env.SERVER_URL}${url}`, config)
    .then(res=>{
        dispatch(filterPrice(res.data))
    })
}

export const filterRatingAction = (rating) => async (dispatch)=>{
    dispatch(filterLoading())
    const  config = {
        headers:{
          'Content-Type':'application/json',
          "Accept-Encoding": "gzip,deflate,compress"
        }
    }
    
    await axios.get(`${process.env.SERVER_URL}api/filter/rating/${rating}/`, config)
    .then(res=>{
        dispatch(filterRating(res.data))
    })
}

export const filterConditionAction = (condition) => async (dispatch)=>{
    dispatch(filterLoading())
    const  config = {
        headers:{
          'Content-Type':'application/json',
          "Accept-Encoding": "gzip,deflate,compress"
        }
    }
    
    await axios.get(`${process.env.SERVER_URL}api/filter/rating/${condition}/`, config)
    .then(res=>{
        dispatch(filterCondition(res.data))
    })
}

export const filterPriceAndConditionAction = (minprice, maxprice, condition) => async (dispatch)=>{
    dispatch(filterLoading())
    const  config = {
        headers:{
          'Content-Type':'application/json',
          "Accept-Encoding": "gzip,deflate,compress"
        }
    }
    
    await axios.get(`${process.env.SERVER_URL}api/filter/price_and_condition/${minprice}/${maxprice}/${condition}/`, config)
    .then(res=>{
        dispatch(filterPriceAndCondition(res.data))
    })
}


export const filterPriceAndRatingAction = (minprice, maxprice, rating) => async (dispatch)=>{
    dispatch(filterLoading())
    const  config = {
        headers:{
          'Content-Type':'application/json',
          "Accept-Encoding": "gzip,deflate,compress"
        }
    }
    
    await axios.get(`${process.env.SERVER_URL}api/filter/price_and_rating/${minprice}/${maxprice}/${rating}/`, config)
    .then(res=>{
        dispatch(filterPriceAndRating(res.data))
    })

}

export const filterRatingAndConditionAction = (condition, rating) => async (dispatch)=>{
    dispatch(filterLoading())
    const  config = {
        headers:{
          'Content-Type':'application/json',
          "Accept-Encoding": "gzip,deflate,compress"
        }
    }
    
    await axios.get(`${process.env.SERVER_URL}api/filter/rating_and_condition/${rating}/${condition}/`, config)
    .then(res=>{
        dispatch(filterRatingAndCondition(res.data))
    })
}

export const filterAllAction = (minprice,maxprice, condition, rating) => async (dispatch)=>{
    dispatch(filterLoading())
    const  config = {
        headers:{
          'Content-Type':'application/json',
          "Accept-Encoding": "gzip,deflate,compress"
        }
    }
    
    await axios.get(`${process.env.SERVER_URL}api/filter/${minprice}/${maxprice}/${rating}/${condition}/`, config)
    .then(res=>{
        dispatch(filterAll(res.data))
    })
}