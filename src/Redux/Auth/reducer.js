import * as actionTypes from "./actionTypes";

const userInfo = JSON.parse(localStorage.getItem('userInfo'));

const initialState = {
    isLoading: false,
    isError: false,
    token: userInfo ? userInfo.token : "",
    userId: userInfo ? userInfo._id : "",
    isLoggedIn: userInfo ? userInfo.isLoggedIn : false,
    loggedInUser: {}
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.USER_SIGN_UP_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.USER_SIGN_UP_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.USER_SIGN_UP_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case actionTypes.USER_LOG_IN_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.USER_LOG_IN_SUCCESS:
            localStorage.removeItem('userInfo');
            localStorage.setItem('userInfo', JSON.stringify({ _id: payload._id, token: payload.token }));
            console.log(payload);
            return {
                ...state,
                isLoading: false,
                userId: payload._id,
                isLoggedIn: true
            }
        case actionTypes.USER_LOG_IN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case actionTypes.GET_USER_BY_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.GET_USER_BY_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                loggedInUser: payload
            }
        case actionTypes.GET_USER_BY_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            return state;
    }
}