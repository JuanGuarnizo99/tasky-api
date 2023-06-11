import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";

function ListItem({task}) {
    return (
      <li className="list-item">
        <div className="info-container">
          <TickIcon></TickIcon>
          <p className="task-title">{task.title}</p>
          <ProgressBar></ProgressBar>
        </div>

        {/* button container */}
        <div className="button-container">
          <button className="edit">Edit</button>
          <button className="delete">Delete</button>

        </div>
      </li>
    );
  }
  
  export default ListItem;