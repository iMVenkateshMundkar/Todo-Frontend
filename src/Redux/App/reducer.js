import * as actionTypes from "./actionTypes";

const initialState = {
    isLoading: false,
    isError: false,
    allTasks: [],
    oneTask: {}
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.GET_ALL_TASKS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.GET_ALL_TASKS_SUCCESS:
            console.log(payload);
            return {
                ...state,
                isLoading: false,
                allTasks: payload
            }
        case actionTypes.GET_ALL_TASKS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case actionTypes.GET_TASK_BY_ID_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.GET_TASK_BY_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                oneTask: payload
            }
        case actionTypes.GET_TASK_BY_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
            return state;
    }
}