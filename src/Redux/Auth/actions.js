import axios from "axios";
import * as actionTypes from "./actionTypes";

export const userSignUp = (userInfo) => async (dispatch) => {
    dispatch({ type: actionTypes.USER_SIGN_UP_REQUEST });
    return await axios({
        method: "post",
        url: "/signup",
        baseURL: "http://localhost:3000",
        data: userInfo
    }).then(r => dispatch({ type: actionTypes.USER_SIGN_UP_SUCCESS }))
        .catch(e => dispatch({ type: actionTypes.USER_SIGN_UP_FAILURE }));
}

export const userLogIn = (userInfo) => async (dispatch) => {
    dispatch({ type: actionTypes.USER_LOG_IN_REQUEST });
    return await axios({
        method: 'post',
        url: "/login",
        baseURL: "http://localhost:3000",
        data: userInfo
    }).then(r => dispatch({ type: actionTypes.USER_LOG_IN_SUCCESS, payload: r.data.data }))
        .catch(e => dispatch({ type: actionTypes.USER_LOG_IN_FAILURE }));
}

export const userLogOut = (userId) => async (dispatch) => {
    dispatch({ type: actionTypes.USER_LOG_OUT_REQUEST });
    return await axios({
        method: 'post',
        url: `/logout/${userId}`,
        baseURL: 'http://localhost:3000'
    }).then(r => dispatch({ type: actionTypes.USER_LOG_OUT_SUCCESS }))
        .catch(e => dispatch({ type: actionTypes.USER_LOG_OUT_FAILURE }));
}

export const getUserById = (userId) => async (dispatch) => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    dispatch({ type: actionTypes.GET_USER_BY_ID_REQUEST });
    return await axios({
        method: 'get',
        url: `/users/${userId}`,
        baseURL: 'http://localhost:3000',
        headers: {
            "Authorization": `Authorization token is ${userData.token}`,
        }
    }).then(r => dispatch({ type: actionTypes.GET_USER_BY_ID_SUCCESS, payload: r.data.data }))
        .catch(err => dispatch({ type: actionTypes.GET_USER_BY_ID_FAILURE }));
}