import axios from 'axios';
import * as actionTypes from './actionTypes';

export const addTask = (taskDetails) => async (dispatch) => {
    dispatch({ type: actionTypes.ADD_TASK_REQUEST });
    return await axios({
        method: 'post',
        url: `/tasks`,
        baseURL: 'http://localhost:3000',
        data: taskDetails
    }).then(r => dispatch({ type: actionTypes.ADD_TASK_SUCCESS }))
        .catch(err => dispatch({ type: actionTypes.ADD_TASK_FAILURE }));
}

export const getAllTasks = (userId) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_ALL_TASKS_REQUEST });
    return await axios({
        method: 'get',
        url: `/tasks/users/${userId}`,
        baseURL: 'http://localhost:3000'
    }).then(r => dispatch({ type: actionTypes.GET_ALL_TASKS_SUCCESS, payload: r.data.data }))
        .catch(e => dispatch({ type: actionTypes.GET_ALL_TASKS_FAILURE }));
}

export const getOneTaskById = (taskId) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_TASK_BY_ID_REQUEST });
    return await axios({
        method: 'get',
        url: `/tasks/${taskId}`,
        baseURL: 'http://localhost:3000'
    }).then(r => dispatch({ type: actionTypes.GET_TASK_BY_ID_SUCCESS, payload: r.data.data }))
        .catch(err => dispatch({ type: actionTypes.GET_TASK_BY_ID_FAILURE }));
}

export const deleteOneTaskById = (taskId) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_TASK_BY_ID_REQUEST });
    return await axios({
        method: 'delete',
        url: `/tasks/${taskId}`,
        baseURL: 'http://localhost:3000'
    }).then(r => dispatch({ type: actionTypes.DELETE_TASK_BY_ID_SUCCESS }))
        .catch(err => dispatch({ type: actionTypes.DELETE_TASK_BY_ID_FAILURE }))
}

export const updateOneTaskById = (taskId, taskDetails) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_TASK_BY_ID_REQUEST });
    return await axios({
        method: 'put',
        url: `/tasks/${taskId}`,
        baseURL: 'http://localhost:3000',
        data: taskDetails
    }).then(r => dispatch({ type: actionTypes.UPDATE_TASK_BY_ID_SUCCESS }))
        .catch(err => dispatch({ type: actionTypes.UPDATE_TASK_BY_ID_FAILURE }));
}