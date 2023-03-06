import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board } from "../types/types";

type DisplayState = {
    entities: string;
    secondEntities: string;
    dash: string;
    result: string;
    statusSwitch: string;
};

const initialState: DisplayState = {
    entities: "0",
    secondEntities: "",
    dash: "",
    result: "",
    statusSwitch: "Constructor"
};

const displaySlice = createSlice({
    name: "display",
    initialState,
    reducers: {
        displayReceved: (state, action) => {
            state.entities = action.payload;
        },
        addItemDisplay: (state, action) => {
            if (state.entities === "0" && action.payload !== ",") {
                state.entities = action.payload;
            } else {
                state.entities += action.payload;
            }
            state.result = "";
        },
        addItemDash: (state, action) => {
            if (state.result) {
                state.entities = state.result;
                state.result = "";
            }
            state.dash = action.payload;
        },
        addItemSecondValue: (state, action) => {
            state.secondEntities += action.payload;
        },
        doResult: (state, action) => {
            state.entities = state.entities.replace(",", ".");
            state.secondEntities = state.secondEntities.replace(",", ".");
            if (state.entities && state.secondEntities) {
                switch (action.payload) {
                    case "+":
                        state.result = String(
                            Number(state.entities) +
                                Number(state.secondEntities)
                        );
                        break;
                    case "-":
                        state.result = String(
                            Number(state.entities) -
                                Number(state.secondEntities)
                        );
                        break;
                    case "x":
                        state.result = String(
                            Number(state.entities) *
                                Number(state.secondEntities)
                        );
                        break;
                    case "/":
                        if (state.entities === "0") {
                            state.result = "определенно";
                            break;
                        }
                        state.result = String(
                            Number(state.entities) /
                                Number(state.secondEntities)
                        );
                        break;
                }

                state.result = state.result.replace(".", ",");
                state.dash = "";
                state.entities = "";
                state.secondEntities = "";
            }
        },
        statusRun: (state) => {
            state.statusSwitch = "Runtime";
        },
        statusConstructor: (state) => {
            state.statusSwitch = "Constructor";
            state.dash = "";
            state.entities = "0";
            state.secondEntities = "";
            state.result = "";
        }
    }
});

const { reducer: displayReducer, actions } = displaySlice;
export const {
    displayReceved,
    addItemDisplay,
    addItemDash,
    addItemSecondValue,
    doResult,
    statusRun,
    statusConstructor
} = actions;

export default displayReducer;
