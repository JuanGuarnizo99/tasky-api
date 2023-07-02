import { useState } from "react";
import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";




function ListItem({task, getData}) {

  const [showModal, setShowModal] = useState(false);

  // Deletes a task object
  const deleteData = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
      method: "DELETE"
    })
   .then((res) => {
    if(res.status === 200) {
      setShowModal(false);
      getData();
    }
   })
   .catch((err) => console.error(err));
  };


  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon></TickIcon>
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress}></ProgressBar>
      </div>

      {/* button container */}
      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>Edit</button>
        <button className="delete" onClick={deleteData}>Delete</button>

      </div>

      {showModal && <Modal mode={'edit'} setShowModal={setShowModal} task = {task} getData={getData}/>}
    </li>
  );
}
  
  export default ListItem;