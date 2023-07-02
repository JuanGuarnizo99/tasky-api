import Modal from "./Modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

function ListHeader({listName, getData}) {
  const [cookies, setCookies, removeCookies] = useCookies(null);
  //sign out function
  const signOut = () => {
    removeCookies('Email');
    removeCookies('AuthToken');
    window.location.reload();
  };

  const [showModal, setShowModal] = useState(false);


  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create" onClick={() => setShowModal(true)}>New</button>
        <button className="signout" onClick={signOut}>Sign Out</button>
      </div>
      {/* If I click on the 'create' button, it shows the modal asking for the new task's data */}
      {showModal && <Modal mode={"create"} setShowModal={setShowModal} getData={getData}/>}
    </div>
  );
}

export default ListHeader;