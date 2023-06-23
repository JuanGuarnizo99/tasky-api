import { useState } from "react";

function Auth() {

  const [isLogIn, setIsLogIn] = useState(true);

  const [error, setError] = useState(null);

  const viewLogin = (status) => {
    setError(null);
    setIsLogIn(status);
  }

  return (
    <div className='auth-container'>
      <div className="auth-container-box">
        <form>
          <h2>{isLogIn ? "Please log in" : "Please sign up"}</h2>
          <input type="email" placeholder="email"/>
          <input type="password" placeholder="password"/>
          {!isLogIn && <input type="password" placeholder="confirm password"/>}
          <input type="submit" value={isLogIn? "Log in" : "Sign up"} className="create"/>
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button type="button"  
            onClick={() => viewLogin(false)}
            style= {{backgroundColor: !isLogIn? "white" : 'rgb(180, 180, 180)'}}
          > Sign Up </button>
          <button type="button"  
            onClick={() => viewLogin(true)}
            style= {{backgroundColor: isLogIn? "white" : 'rgb(180, 180, 180)'}}
          > Log In </button>
        </div>

      </div>
    </div>
  );
}

export default Auth;