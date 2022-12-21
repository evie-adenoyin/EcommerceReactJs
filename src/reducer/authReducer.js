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


const initailState = {
    token : localStorage.getItem('toekn'),
    isAuthenticated : null,
    isloading : false,
    use: null,
    msg:""
}


export const authReducer = (state = initailState, action) =>{
    const {type, payload} = action

    switch (type) {
        case USER_LOADING:
            return {
                ...state,
                isloading : true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated : true,
                isloading : false,
                use: payload,
            }
        case AUTH_FAIL:
            return {
                ...state,
                isloading : true
            }
        case LOGIN_SUCCESSFUL:
            localStorage.setItem('token', JSON.stringify(payload))
            return {
                ...state,
                isloading : false,
                isAuthenticated : true,
                use: payload,
                msg : "login successful"
            }
        case LOGIN_FAILED:
            return {
                ...state,
                isloading : false,
                isAuthenticated : null,
                use: null,
                msg : payload
            }
        case LOGOUT_SUCCESSFUL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isloading : true,
                isAuthenticated : false,
                msg:payload
            }
        case REGISTRATION_SUCCESSFUL:
            localStorage.setItem('token', JSON.stringify(payload))
            return {
                ...state,
                isloading : false,
                isAuthenticated : true,
                use: payload,
                msg : "Registeration successful"
            }
        case REGISTRATION_FAILED:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isloading : false,
                isAuthenticated : false,
                msg: payload
            }
    
        default:
            return state
    }
}