import {combineReducers} from 'redux'
import { authReducer } from './authReducer'
import { cartReducer } from './cartReducer'
import { filterReducer } from './filterReducer'
import { itemReducer } from './itemReducer'
import { userReducer } from './userReducer'



const rootReducer =  combineReducers({
    authReducer,
    cartReducer,
    filterReducer,
    itemReducer,
    userReducer,
})

export default rootReducer