import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { reducer as authReducer } from "./Auth/reducer";
import { reducer as appreducer } from './App/reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    app: appreducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));