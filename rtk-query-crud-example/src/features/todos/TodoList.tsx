import { useState } from "react";
import { FaTrashCan, FaUpload } from "react-icons/fa6";
import {
   useGetTodosQuery,
   useAddTodoMutation,
   useUpdateTodoMutation,
   useDeleteTodoMutation,
} from "../api/apiSlice";

const TodoList = () => {
   const [newTodo, setNewTodo] = useState("");
   const {
      data: todos = [],
      isLoading,
      isSuccess,
      isError,
      error,
   } = useGetTodosQuery();
   const [addTodo] = useAddTodoMutation();
   const [updateTodo] = useUpdateTodoMutation();
   const [deleteTodo] = useDeleteTodoMutation();

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      //addTodo
      addTodo({ userId: 29, title: newTodo, completed: false });
      setNewTodo("");
   };

   const newItemSection = (
      <form onSubmit={handleSubmit}>
         <label htmlFor="new-todo">Enter a new todo item</label>
         <div className="new-todo">
            <input
               type="text"
               id="new-todo"
               value={newTodo}
               onChange={(e) => setNewTodo(e.target.value)}
               placeholder="Enter new todo"
            />
         </div>
         <button className="submit">
            <FaUpload />
         </button>
      </form>
   );

   let content;
   // Define conditional content
   if (isLoading) {
      content = <p>Loading...</p>;
   } else if (isSuccess) {
      content = todos.map((todo) => (
         <article key={todo.id}>
            <div className="todo">
               <input
                  type="checkbox"
                  id={todo.id.toString()}
                  onChange={() =>
                     updateTodo({ ...todo, completed: !todo.completed })
                  }
               />
               <label htmlFor={todo.id.toString()}>{todo.title}</label>
            </div>

            <button
               className="trash"
               onClick={() => deleteTodo({ id: todo.id })}
            >
               <FaTrashCan />
            </button>
         </article>
      ));
   } else if (isError) {
      if ("status" in error && error.status === "PARSING_ERROR") {
         content = <p>Error: Unable to parse server response.</p>;
      } else if ("status" in error) {
         content = (
            <p>
               Error: {error.status} - {JSON.stringify(error.data)}
            </p>
         );
      } else {
         content = <p>{error.message}</p>;
      }
   }

   return (
      <main>
         <h1>Todo List</h1>
         {newItemSection}
         {content}
      </main>
   );
};
export default TodoList;
