import {
    GET_ITEMS,
    SEARCH_ITEMS,
    GET_ITEM_BY_CATEGORY,
    GET_ITEM_BY_ID,
    GET_PRODUCT_IMAGES,
    ADD_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
    ITEMS_LOADING,
    EMPTY_ITEMS,
} from '../types/itemTypes'

import axios from 'axios'


const getItems= (data) =>{
   return {
    type : GET_ITEMS,
    payload : data
   }
}

const searchItems= (data) =>{
   return {
    type : SEARCH_ITEMS,
    payload : data
   }
}

const getItemsByCategory= (data) =>{
   return {
    type : GET_ITEM_BY_CATEGORY,
    payload : data
   }
}

const getItemsById= (data) =>{
   return {
    type : GET_ITEM_BY_ID,
    payload : data
   }
}

const getProductImages= (data) =>{
   return {
    type : GET_PRODUCT_IMAGES,
    payload : data
   }
}

const addItem= (data) =>{
   return {
    type : ADD_ITEM,
    payload : data
   }
}

const updateItem= (data) =>{
   return {
    type : UPDATE_ITEM,
    payload : data
   }
}

const deleteItem= (data) =>{
   return {
    type : DELETE_ITEM,
    payload : data
   }
}
const itemsLoading= () =>{
   return {
    type : ITEMS_LOADING,
   }
}
const emptyItems= () =>{
   return {
    type : EMPTY_ITEMS,
   }
}




export const getItemsAction = (url) => async (dispatch)=>{
    dispatch(itemsLoading())
    const  config = {
        headers:{
          'Content-Type':'application/json',
          "Accept-Encoding": "gzip,deflate,compress"
        }
    }
    await axios.get(`${process.env.SERVER_URL}${url}`, config)
    .then(res=>{
        dispatch(getItems(res.data))
    })
}


export const searchItemsAction = (keyword) => async (dispatch)=>{
    dispatch(itemsLoading())
    const  config = {
        headers:{
          'Content-Type':'application/json',
          "Accept-Encoding": "gzip,deflate,compress"
        }
    }
    await axios.get(`${process.env.SERVER_URL}api/products/find?search=${keyword}`, config)
    .then(res=>{
        dispatch(searchItems(res.data))
    })
}

export const getItemsByIdAction = (url,id) => async (dispatch)=>{
    dispatch(itemsLoading())
    const  config = {
        headers:{
          'Content-Type':'application/json',
          "Accept-Encoding": "gzip,deflate,compress"
        }
    }
    await axios.get(`${process.env.SERVER_URL}${url}/${id}`, config)
    .then(res=>{
        dispatch(getItemsById(res.data))
    })
}

export const getProductImagesAction = (id) => async (dispatch)=>{
    dispatch(itemsLoading())
    const  config = {
        headers:{
          'Content-Type':'application/json',
          "Accept-Encoding": "gzip,deflate,compress"
        }
    }
    await axios.get(`${process.env.SERVER_URL}api/productImg/${id}/`, config)
    .then(res=>{
        dispatch(getProductImages(res.data))
    })
}

export const getItemsByCategoryAction = (category) => async (dispatch)=>{
    dispatch(itemsLoading())
    const  config = {
        headers:{
          'Content-Type':'application/json',
          "Accept-Encoding": "gzip,deflate,compress"
        }
    }
    await axios.get(`${process.env.SERVER_URL}api/find/${category}/`, config)
    .then(res=>{
        dispatch(getItemsByCategory(res.data))
    })
}

export const addItemAction = (item, file) => async (dispatch)=>{
    dispatch(itemsLoading())
    const  config = {
        headers:{
          'Content-Type':'application/json',
          "Accept-Encoding": "gzip,deflate,compress"
        }
    }

    if(!file){
        //placeholder if file image null
        item.thumbnail = 'https://idex.gov.in/sites/default/files/2020-12/place_8.png'
        await axios.post(`${process.env.SERVER_URL}api/product/`,item, config)
        .then(res=>{
            dispatch(addItem(res.data))
        })
    }else {
        let fileData = new FormData();
        fileData.append('imgFile', file)

        await axios.post(`${process.env.SERVER_URL}api/uploadfile/`,fileData, config)
        .then(res=>{
            if(res.status===201){
                item.thumbnail = res.data.imgFile;
                 axios.post(`${process.env.SERVER_URL}api/product/`,item, config)
                    .then(res=>{
                        dispatch(addItem(res.data))
                    }) 
            }
        }) 
    }
  
}

export const deleteItemAction = (id, filename) => async (dispatch)=>{
    dispatch(itemsLoading())
    const  config = {
        headers:{
          'Content-Type':'application/json',
          "Accept-Encoding": "gzip,deflate,compress"
        }
    }
    await axios.delete(`${process.env.SERVER_URL}api/product/${id}/`, config)
    .then(res=>{
        axios.delete(`${process.env.SERVER_URL}api/deleteFile/${filename}/`, config)
        .then(res=>{
            dispatch(deleteItem(res.data))
        })
    })
}


export const updateItemAction = (id, item, file) => async (dispatch)=>{
    dispatch(itemsLoading())
    const  config = {
        headers:{
          'Content-Type':'application/json',
          "Accept-Encoding": "gzip,deflate,compress"
        }
    }
    if(!file){
        await axios.put(`${process.env.SERVER_URL}api/product/${id}/`,item, config)
        .then(res=>{
           dispatch(updateItem(res.data))
        })
    }else{
        let fileData = new FormData();
        fileData.append('imgFile', file)
        await axios.post(`${process.env.SERVER_URL}api/uploadFile/${id}/`,fileData, config)
        .then(res=>{
          if (res.status ===201){
            const fileNameBefore = item.thumbnail.split('/').at(-1)
            item.thumbnail = res.data.imgFile
             axios.put(`${process.env.SERVER_URL}api/product/${id}/`,item, config)
                .then(res=>{
                    axios.put(`${process.env.SERVER_URL}api/deleteFile/${fileNameBefore}/`,item, config)
                    .then(res=>{
                        dispatch(updateItem(res.data))
                    })
                })
          }
        })
    }
   
}


export const emptyItemsAction = () => async (dispatch)=>{
        dispatch(emptyItems())
}