import { combineReducers, configureStore } from "@reduxjs/toolkit";
import componentListReducer from "./componentList";
import displayReducer from "./display";

const rootReducer = combineReducers({
    componentList: componentListReducer,
    display: displayReducer
});

const store = configureStore({
    reducer: rootReducer
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
