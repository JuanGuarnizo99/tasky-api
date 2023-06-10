function ListHeader({listName}) {
  //sign out function
  const signOut = () => {
    console.log("signout");
  };

    return (
      <div className="list-header">
        <h1>{listName}</h1>
        <div className="button-container">
          <button className="create">New</button>
          <button className="signout" onClick={signOut}>Sign Out</button>
        </div>
      </div>
    );
  }
  
  export default ListHeader;