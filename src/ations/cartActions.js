import {
    GET_CART,
    ADD_TO_CART,
    DELETE_FROM_CART,
    CART_LOADING,
    GET_ITEMS_CART,
    ADD_ITEMS_TO_CART,
    DELETE_ITEM_FROM_CART,
    CART_ITEM_LOADING
} from '../types/CartTypes'

import axios from 'axios'


// Action creators 
const cartLaoding = () =>{
  return {
    type:CART_LOADING,
  }
}

const getCart = (data) =>{
  return {
    type:GET_CART,
    payload : data
  }
}

const addToCart = (data) =>{
  return {
    type:ADD_TO_CART,
    payload : data
  }
}

const deleteFromCart = (data) =>{
  return {
    type:DELETE_FROM_CART,
    payload : data
  }
}

const getCartItems = (data) =>{
  return {
    type:GET_ITEMS_CART,
    payload : data
  }
}

const addItemsToCart = (data) =>{
  return {
    type:ADD_ITEMS_TO_CART,
    payload : data
  }
}

const deleteItemFromCart = (data) =>{
  return {
    type:DELETE_ITEM_FROM_CART,
    payload : data
  }
}

const cartItemLoading = (data) =>{
  return {
    type:CART_ITEM_LOADING,
    payload : data
  }
}



// Thunk async action creators 
export const getCartAction = (cartid) =>async (dispatch) =>{
  dispatch(cartLaoding())
  const  config = {
    headers:{
      'Content-Type':'application/json',
      "Accept-Encoding": "gzip,deflate,compress"
    }
  }
  await axios.get(`${process.env.SERVER_URL}api/cart/${cartid}`, config)
  .then(res=>{
    dispatch(getCart(res.data))
  })

}


export const addtoCartAction = (cartid, quantity) =>async (dispatch) =>{
  dispatch(cartLaoding())
  const  config = {
    headers:{
      'Content-Type':'application/json',
      "Accept-Encoding": "gzip,deflate,compress"
    }
  }
  await axios.put(`${process.env.SERVER_URL}api/cart/${cartid}`, {'cartId': cartid, 'quantity': quantity + 1}, config)
  .then(res=>{
    dispatch(addToCart(res.data))
  })

}

export const deleteFromCartAction = (cartid, quantity) =>async (dispatch) =>{
  dispatch(cartLaoding())
  const  config = {
    headers:{
      'Content-Type':'application/json',
      "Accept-Encoding": "gzip,deflate,compress"
    }
  }
  await axios.put(`${process.env.SERVER_URL}api/cart/${cartid}`, {'cartId': cartid, 'quantity': quantity - 1}, config)
  .then(res=>{
    dispatch(deleteFromCart(res.data))
  })

}

export const getCartItemsAction = (cartitemid) =>async (dispatch) =>{
  dispatch(cartItemLoading())
  const  config = {
    headers:{
      'Content-Type':'application/json',
      "Accept-Encoding": "gzip,deflate,compress"
    }
  }
  await axios.get(`${process.env.SERVER_URL}api/cartitems/${cartitemid}`, config)
  .then(res=>{
    dispatch(getCartItems(res.data))
  })

}


export const addItemsToCartAction = (cartitemid, productid) =>async (dispatch) =>{
  dispatch(cartLaoding())
  const  config = {
    headers:{
      'Content-Type':'application/json',
      "Accept-Encoding": "gzip,deflate,compress"
    }
  }

  await axios.get(`${process.env.SERVER_URL}api/cartitems/detectsameitem/${cartitemid}/${productid}`,{'cartitemid':cartitemid, 'productid' : productid }, config)
  .then(res=>{
    if (res.data.length === 0){
         axios.post(`${process.env.SERVER_URL}api/cartitems/${cartitemid}/${productid}`,{'cartitemid':cartitemid, 'productid' : productid, 'quantity': 1 }, config)
         .then(res=>{
            dispatch(addItemsToCart(res.data))
         })
    }else{

        axios.put(`${process.env.SERVER_URL}api/cartitems/id/${res.data[0].id}`, {'cartitemid':cartitemid, 'productid' : productid, 'quantity': res.data[0]?.quantity + 1 }, config)
    }
  })

}


export const deleteItemFromCartAction = (cartitemid) =>async (dispatch) =>{
    dispatch(cartLaoding())
    const  config = {
      headers:{
        'Content-Type':'application/json',
        "Accept-Encoding": "gzip,deflate,compress"
      }
    }
    await axios.delete(`${process.env.SERVER_URL}api/cartitems/${cartitemid}`, config)
    .then(res=>{
      dispatch(deleteItemFromCart(res.data))
    })
  
  }
