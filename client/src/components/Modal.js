function Modal() {

  const mode = "create";

  const handleChange = (e) => {
    console.log("Changing!...");
  }

  return (
    <div className= "overlay">
      <div className="modal">
        <div className= "form-title-container">
          <h3>Let's {mode} your task</h3>
          <button>X</button>
        </div>
        <form>
          <input
            required
            maxLength="30"
            placeholder=" Your task goes here"
            name="title"
            value={""}
            onChange={handleChange}
          /> 
          <br/>
          <label for="range">Drag to select your current progress</label>
          <input
            required
            id="range"
            type="range"
            min="0"
            max="100"
            name="progress"
            value={""}
            onChange={handleChange}
          /> 
          <br/>
          
          <input className={mode} type="submit"/>

        </form>
      </div>
    </div>
  );
  }
  
  export default Modal;