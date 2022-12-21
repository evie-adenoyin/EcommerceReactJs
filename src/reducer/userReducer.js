import {
    GET_USER,
    CREATE_STORE,
    GET_STORE,
    USER_LOADING
} from '../types/userTypes'


const initailState = {
    user : null,
    store : null,
    loading : false,
}


export const userReducer = (state = initailState, action) =>{
    const {type, payload} = action

    switch (type) {
        case GET_USER:
            return {
                ...state,
                user : payload,
                loading : false,
            }
        case CREATE_STORE:
            return {
                ...state,
                store : payload,
                loading : false,
            }
        case GET_STORE:
            return {
                ...state,
                store : payload,
                loading : false,
            }
        case USER_LOADING:
            return {
                ...state,
                loading : true,
            }
        default:
            return state
    }
}