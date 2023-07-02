import { useState } from "react";
import { useCookies } from "react-cookie";

function Auth() {

  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogIn, setIsLogIn] = useState(true);

  const [error, setError] = useState(null);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const viewLogin = (status) => {
    setError(null);
    setIsLogIn(status);
  }

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    // sign up page
    if(!isLogIn && password!== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    console.log(endpoint);

    await fetch(`${process.env.REACT_APP_SERVERURL}${endpoint}`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({email, password})
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.detail){
        setError(data.detail);
      }
      else{
        console.log(data.email);
        console.log(data.token);
        setCookie('Email', data.email);
        setCookie('AuthToken', data.token);
        //refresh the page
        window.location.reload();
      }
    })
    .catch((error) => console.error(error));
  }

  return (
    <div className='auth-container'>
      <div className="auth-container-box">
        <form onSubmit={(e) => handleSubmit(e, isLogIn? '/login' : '/signup')}>
          <h2 className="auth-sign">{isLogIn ? "Please log in" : "Please sign up"}</h2>
          <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
          {!isLogIn && <input type="password" placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)}/>}
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