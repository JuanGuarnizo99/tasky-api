import { useState } from "react";
import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";




function ListItem({task}) {

  const [showModal, setShowModal] = useState(false);


  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon></TickIcon>
        <p className="task-title">{task.title}</p>
        <ProgressBar></ProgressBar>
      </div>

      {/* button container */}
      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>Edit</button>
        <button className="delete">Delete</button>

      </div>

      {showModal && <Modal mode={'edit'} setShowModal={setShowModal}/>}
    </li>
  );
}
  
  export default ListItem;