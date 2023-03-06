import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board } from "../types/types";

type ComponentListState = {
    entities: Board[];
};

const initialState: ComponentListState = {
    entities: []
};

const componentListSlice = createSlice({
    name: "componentList",
    initialState,
    reducers: {
        componentListReceved: (state, action: PayloadAction<Board[]>) => {
            state.entities = action.payload;
        },
        addComponent: (state, action: PayloadAction<Board>) => {
            state.entities.push(action.payload);
        }
    }
});

const { reducer: componentListReducer, actions } = componentListSlice;
export const { componentListReceved, addComponent } = actions;

export default componentListReducer;
