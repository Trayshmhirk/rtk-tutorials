import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface TodoState {
   todos: { id: string; text: string }[];
}

const initialState: TodoState = {
   todos: [],
};

const todoSlice = createSlice({
   name: "todos",
   initialState,
   reducers: {
      addTodo: (state, action: PayloadAction<string>) => {
         state.todos.push({
            id: nanoid(),
            text: action.payload,
         });
      },
      removeTodo: (state, action) => {
         state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      },
   },
});

export const { addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
