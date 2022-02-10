import { createSlice } from "@reduxjs/toolkit";

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

export const { setTodosReducer, addTodoReducer, updateTodoReducer } = todosSlice.actions;
export default todosSlice.reducer;