import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TodoList {
   id: number;
   userId: number;
   title: string;
   completed: boolean;
}

export const apiSlice = createApi({
   reducerPath: "api",
   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
   tagTypes: ["Todos"],

   endpoints: (builder) => ({
      getTodos: builder.query<TodoList[], string | void>({
         query: () => "/todos",
         transformResponse: (res: TodoList[]) =>
            res.sort((a, b) => b.id - a.id),
         providesTags: ["Todos"],
      }),
      addTodo: builder.mutation<TodoList, Partial<TodoList>>({
         query: (todo) => ({
            url: "/todos",
            method: "POST",
            body: todo,
         }),
         invalidatesTags: ["Todos"],
      }),
      updateTodo: builder.mutation<TodoList, Partial<TodoList>>({
         query: (todo) => ({
            url: `/todos/${todo.id}`,
            method: "PATCH",
            body: todo,
         }),
         invalidatesTags: ["Todos"],
      }),
      deleteTodo: builder.mutation<
         { success: boolean; id: number },
         { id: number }
      >({
         query: ({ id }) => ({
            url: `/todos/${id}`,
            method: "DELETE",
         }),
         invalidatesTags: ["Todos"],
      }),
   }),
});

export const {
   useGetTodosQuery,
   useAddTodoMutation,
   useUpdateTodoMutation,
   useDeleteTodoMutation,
} = apiSlice;
