import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [{ id: 1, text: 'Learn Redux', completed: false }],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
    },
    removeTodo:(state, action)=>{
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    updateTodo:(state, action)=>{
        const { id, text } = action.payload;
        const todo = state.todos.find(todo => todo.id === id);
        if (todo) {
            todo.text = text;
        }
    },
    toggleTodo:(state,action)=>{
        const todo = state.todos.find(todo => todo.id === action.payload);
        if (todo) {
            todo.completed = !todo.completed;
        }
    }
  },
});

export const { addTodo, removeTodo, updateTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;