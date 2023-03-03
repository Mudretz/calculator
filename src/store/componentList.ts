import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board } from "../types/types";

type ComponentListState = {
    entities: Board[],
    lastFetch: number
};

const initialState: ComponentListState = {
    entities: [],
    lastFetch: 0
}

const componentListSlice = createSlice({
    name: "componentList",
    initialState,
    reducers: {
        componentListReceved: (state, action: PayloadAction<Board[]>) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
        },
        addComponent: (state, action: PayloadAction<Board>) => {
            state.entities.push(action.payload);
        }
    }
});

const { reducer: componentListReducer, actions } = componentListSlice;
export const { componentListReceved, addComponent } = actions;

export default componentListReducer;

