import * as actionTypes from "./actionTypes";

export const userSignUp = (userInfo) => async (dispatch) => {
    dispatch({ type: actionTypes.USER_SIGN_UP_REQUEST });
    return await axios({
        method: "post",
        url: "/api/signup",
        baseURL: "https://localhost:4000",
        data: userInfo
    }).then(r => dispatch({ type: actionTypes.USER_SIGN_UP_SUCCESS }))
        .catch(e => dispatch({ type: actionTypes.USER_SIGN_UP_FAILURE }));
}

export const userLogIn = (userInfo) => async (dispatch) => {
    dispatch({ type: actionTypes.USER_LOG_IN_REQUEST });
    return await axios({
        method: 'post',
        url: "/api/login",
        baseURL: "https://localhost:4000",
        data: userInfo
    }).then(r => dispatch({ type: actionTypes.USER_LOG_IN_SUCCESS, payload: r.data }))
        .catch(e => dispatch({ type: actionTypes.USER_LOG_IN_FAILURE }));
}