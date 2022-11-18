import { changeConfirmLocale } from 'antd/lib/modal/locale';
import axios from 'axios';
import * as actionTypes from './actionTypes';

const LocalData = () => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    return userData;
}

export const addTask = (taskDetails) => async (dispatch) => {
    const userData = LocalData();
    dispatch({ type: actionTypes.ADD_TASK_REQUEST });
    return await axios({
        method: 'post',
        url: `/tasks`,
        baseURL: 'http://localhost:3000',
        data: taskDetails,
        headers: {
            "Authorization": `Authorization token is ${userData.token}`,
        }
    }).then(r => dispatch({ type: actionTypes.ADD_TASK_SUCCESS }))
        .catch(err => dispatch({ type: actionTypes.ADD_TASK_FAILURE }));
}

let changeDateType = (date) => {
    date = new Date(date);
    date = date.toString();
    date = date.split(" ");
    date = date[0] + " " + date[1] + " " + date[2] + " " + date[3] + " " + date[4];
    return date;
}

export const getAllTasks = (userId) => async (dispatch) => {
    const userData = LocalData();
    dispatch({ type: actionTypes.GET_ALL_TASKS_REQUEST });
    return await axios({
        method: 'get',
        url: `/tasks/users/${userId}`,
        baseURL: 'http://localhost:3000',
        headers: {
            "Authorization": `Authorization token is ${userData.token}`,
        }
    }).then(r => {
        let data = r.data.data;
        data = data.map(task => {
            task.expiryDate = changeDateType(task.expiryDate);
            task.startDate = changeDateType(task.startDate);
            return task;
        })
        dispatch({ type: actionTypes.GET_ALL_TASKS_SUCCESS, payload: data })
    })
        .catch(e => dispatch({ type: actionTypes.GET_ALL_TASKS_FAILURE }));
}

export const getOneTaskById = (taskId) => async (dispatch) => {
    const userData = LocalData();
    dispatch({ type: actionTypes.GET_TASK_BY_ID_REQUEST });
    return await axios({
        method: 'get',
        url: `/tasks/${taskId}`,
        baseURL: 'http://localhost:3000',
        headers: {
            "Authorization": `Authorization token is ${userData.token}`,
        }
    }).then(r => {
        let data = r.data.data;
        data.expiryDate = changeDateType(data.expiryDate);
        data.startDate = changeDateType(data.startDate);
        dispatch({ type: actionTypes.GET_TASK_BY_ID_SUCCESS, payload: r.data.data })
    })
        .catch(err => dispatch({ type: actionTypes.GET_TASK_BY_ID_FAILURE }));
}

export const deleteOneTaskById = (taskId) => async (dispatch) => {
    const userData = LocalData();
    dispatch({ type: actionTypes.DELETE_TASK_BY_ID_REQUEST });
    return await axios({
        method: 'delete',
        url: `/tasks/${taskId}`,
        baseURL: 'http://localhost:3000',
        headers: {
            "Authorization": `Authorization token is ${userData.token}`,
        }
    }).then(r => dispatch({ type: actionTypes.DELETE_TASK_BY_ID_SUCCESS }))
        .catch(err => dispatch({ type: actionTypes.DELETE_TASK_BY_ID_FAILURE }))
}

export const updateOneTaskById = (taskId, taskDetails) => async (dispatch) => {
    const userData = LocalData();
    dispatch({ type: actionTypes.UPDATE_TASK_BY_ID_REQUEST });
    return await axios({
        method: 'put',
        url: `/tasks/${taskId}`,
        baseURL: 'http://localhost:3000',
        data: taskDetails,
        headers: {
            "Authorization": `Authorization token is ${userData.token}`,
        }
    }).then(r => dispatch({ type: actionTypes.UPDATE_TASK_BY_ID_SUCCESS }))
        .catch(err => dispatch({ type: actionTypes.UPDATE_TASK_BY_ID_FAILURE }));
}