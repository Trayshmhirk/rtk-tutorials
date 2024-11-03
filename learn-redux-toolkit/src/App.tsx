import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import { useFetchBreedQuery } from "./features/dogs/dogsSlice";
import { useState } from "react";

function App() {
   const [numDogs, setNumDogs] = useState(1);

   const { data = [], isError } = useFetchBreedQuery(numDogs);

   console.log(data);

   return (
      <div className="w-screen h-screen flex flex-col gap-10 items-center justify-center">
         <div className="flex flex-col items-center gap-6">
            <AddTodo />

            <Todos />
         </div>

         <div className="">
            <p>Dogs to fetch:</p>

            <select
               name=""
               id=""
               value={numDogs}
               onChange={(e) => setNumDogs(Number(e.target.value))}
            >
               <option value="5">5</option>
               <option value="10">10</option>
               <option value="15">15</option>
               <option value="20">20</option>
            </select>
         </div>

         <div>{isError ? "An error has occurred" : null}</div>

         <div className="">
            <div>Number of dogs fetched: {data.length}</div>
            <table>
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>Picture</th>
                  </tr>
               </thead>
               <tbody>
                  {data.map((breed) => (
                     <tr key={breed.id}>
                        <td>{breed.name}</td>
                        <td>
                           <img
                              src={breed.image.url}
                              alt={breed.name}
                              height={250}
                           />
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default App;
