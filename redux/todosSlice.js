import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    todos: [],
};

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        setTodosReducer: (state, action) => {
            state.todos = action.payload;
            console.log(state.todos);
        },
        addTodoReducer: (state, action) => {
            state.todos.push(action.payload);
        },
        hideComplitedReducer: (state, action) => {
            state.todos = state.todos.filter(todo => !todo.isCompleted);
        },
        updateTodoReducer: (state, action) => {
            state.todos = state.todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    return action.payload;
                }
                return todo;
            })
        },
        deleteTodoReducer: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
        }
    },
});

export const { setTodosReducer, addTodoReducer, updateTodoReducer, hideComplitedReducer } = todosSlice.actions;
export default todosSlice.reducer;