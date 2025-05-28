import { useEffect, useState } from "react"
import { getAllPeople } from "./api";
import type { Entity, Person } from "./types";
import { SwCard } from "./components/card/SwCard";
 
function App() {
const [people, setPeople] = useState<Entity<Person>[]>([]);

useEffect(() => {
  getAllPeople().then((data) => {
    setPeople(data.results);
  })
}, [setPeople])
  

  return (
    <div className="flex flex-row flex-wrap items-center justify-center min-h-svh gap-4">
      {people.map((person) => {
        const { name, gender, birth_year } = person.properties;
        const id = person.properties.url?.split('/').filter(Boolean).pop();
        return (
          <SwCard key={id}
          name={name} 
          gender={gender}
          birth_year={birth_year}
          />
        )
      })}
    </div>
  )
}
 
export default App