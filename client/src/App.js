import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useEffect, useState } from "react";

const App = () => {
  //states
  const [tasks, setTasks] = useState([]);
  const userEmail = "juansito@gmail.com";

  const authToken = false;

  //function to get data from db
  const getData = async () => {
    //Ask for the data to the backend
    await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, [authToken]);

  console.log(tasks);

  //Sort by date
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      {!authToken && <Auth></Auth>}
      {/* Only shows if auth token exists */}
      {authToken && (
        <>
          <ListHeader listName={" 👨🏻‍💻 CS tick list"} getData={getData} />
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
