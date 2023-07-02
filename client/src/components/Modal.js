import { useState } from "react";
import { useCookies } from "react-cookie";

function Modal({ mode, setShowModal, task, getData }) {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const editMode = mode === "edit" ? true : false;

  // data object represents a task
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : "test title",
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });

  // Posts the data object to the backend
  const postData = async (e) => {
    e.preventDefault();

    await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          setShowModal(false);
          getData();
        }
      })
      .catch((err) => console.error(err));
  };

  // Edits a task object
  const editData = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
      method: "PUT",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(data),
    })
    .then((res) => {
      if(res.status === 200) {
        setShowModal(false);
        getData();
      }
    })
    .catch((err) => console.error(err));
  };

  // changes the data object when typing on the input components
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));

    console.log(data);
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form onSubmit={editMode ? editData : postData}>
          <input
            required
            maxLength="30"
            placeholder=" Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label>Drag to select your current progress</label>
          <input
            required
            id="range"
            type="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <br />

          <input className={mode} type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Modal;
