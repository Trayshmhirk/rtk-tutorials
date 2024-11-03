import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { removeTodo } from "../features/todo/todoSlice";

const Todos = () => {
   const todos = useAppSelector((state) => state.todos.todos);

   const dispatch = useAppDispatch();

   const DeleteTodo = (todoId: string) => {
      dispatch(removeTodo(todoId));
   };

   return (
      <div className="w-full flex flex-col gap-3 text-center">
         Todo List:
         <ul className="list-none flex flex-col gap-3">
            {todos.map((todo) => (
               <li
                  className="flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
                  key={todo.id}
               >
                  <div className="text-white">{todo.text}</div>
                  <button
                     onClick={() => DeleteTodo(todo.id)}
                     className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                  >
                     Delete
                  </button>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default Todos;
