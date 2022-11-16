import * as actionTypes from "./actionTypes";

const initialState = {
    isLoading: false,
    isError: false,
    token: "",
    user_id: "",
    isLoggedIn: false,
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
            return {
                ...state,
                isLoading: false,
                token: payload.token,
                user_id: payload._id,
                isLoggedIn: true
            }
        case actionTypes.USER_LOG_IN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            return state;
    }
}