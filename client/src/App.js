import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import Banner from "./components/Banner";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const App = () => {
  //states
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  const [tasks, setTasks] = useState([]);

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
      <Banner></Banner>
      {!authToken && <Auth></Auth>}
      {/* Only shows if auth token exists */}
      {authToken && (
        <>
          <ListHeader listName={" 👨‍💻 My To Do "} getData={getData} />
          <p className="user-email">Welcome back {userEmail}</p>
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      )}
      <p className="copyright">© JD coding LLC</p>
    </div>
  );
};

export default App;
