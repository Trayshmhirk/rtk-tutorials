import { useState } from "react";
import { useAppDispatch } from "../hooks/reduxHooks";
import { addTodo } from "../features/todo/todoSlice";

const AddTodo = () => {
   const dispatch = useAppDispatch();
   const [input, setInput] = useState("");

   const addTodoHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      dispatch(addTodo(input));
      setInput("");
   };

   return (
      <div>
         <form action="" className="space-x-3" onSubmit={addTodoHandler}>
            <input
               type="text"
               className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
               placeholder="Enter a todo"
               value={input}
               onChange={(e) => setInput(e.target.value)}
            />

            <button
               type="submit"
               className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
               Add todo
            </button>
         </form>
      </div>
   );
};

export default AddTodo;
