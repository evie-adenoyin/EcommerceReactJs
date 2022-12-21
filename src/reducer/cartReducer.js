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


const initailState = {
    cart : [],
    cartitem : [],
    loadingCart : false,
    loadingCartItem : false
}


export const cartReducer = (state = initailState, action) =>{
    const {type, payload} = action

    switch (type) {
        case GET_CART:
            return {
                ...state,
                cart:payload,
                loadingCart : false,
            }
        case ADD_TO_CART:
            return {
                ...state,
                cart:payload,
                loadingCart : false,
            }
        case DELETE_FROM_CART:
            return {
                ...state,
                cart:payload,
                loadingCart : false,
            }
        case CART_LOADING:
            return {
                ...state,
                loadingCart : true
            }
        case GET_ITEMS_CART:
            return {
                ...state,
                cartitem : payload,
                loadingCartItem : false
            }
        case ADD_ITEMS_TO_CART:
            return {
                ...state,
                cartitem : payload,
                loadingCartItem : false
            }
        case DELETE_ITEM_FROM_CART:
            return {
                ...state,
                cartitem : payload,
                loadingCartItem : false
            }
        case CART_ITEM_LOADING:
            return {
                ...state,
                loadingCartItem : true
            }
    
        default:
            return state
    }
}