import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { toggleTodo, removeTodo, updateTodo } from "../features/todo/todoSlice";

function Todo({ todos }) {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.todos.todos);
  const currentTodo = selector.find((t) => t.id === todos.id) || todos;
  const [todoMsg, setTodoMsg] = React.useState(currentTodo.text || "");
  const [isTodoEditable, setIsTodoEditable] = React.useState(false);

  const handleEditToggle = () => {
    if (isTodoEditable) {
      if (todoMsg.trim()) {
        dispatch(updateTodo({ id: todos.id, text: todoMsg }));
      }
      setIsTodoEditable(false);
    } else {
      setTodoMsg(currentTodo.text || "");
      setIsTodoEditable(true);
    }
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
        currentTodo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={currentTodo.completed || false}
        onChange={() => dispatch(toggleTodo(todos.id))}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${currentTodo.completed ? "line-through" : ""}`}
        value={isTodoEditable ? todoMsg : currentTodo.text || ""}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={handleEditToggle}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => dispatch(removeTodo({ id: todos.id }))}
      >
        ❌
      </button>
    </div>
  );
}

export default Todo;
