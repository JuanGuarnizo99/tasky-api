import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import {useEffect, useState} from 'react';

const App = ()=> {
  //states
  const [tasks, setTasks] = useState([]);
  const userEmail = "juansito@test.com";
  //function to get data from db
  const getData = async () => {
    //Ask for the data to the backend
    await fetch(`http://localhost:8000/todos/${userEmail}`)
    .then(response => response.json())
    .then(data => {
      setTasks(data);
    })
    .catch(error =>{
      console.error(error);
    });
  }

  
  useEffect(()=> getData, []); 

  console.log(tasks);

  //Sort by date  
  const sortedTasks = tasks?.sort((a,b)=> (new Date(a.date)) - (new Date(b.date)));

  return (
    <div className="app">
      <ListHeader listName={" 👨🏻‍💻 CS tick list"}/>
      {sortedTasks?.map((task) =><ListItem key={task.id} task={task} />)}
    </div>
  );
}

export default App;
