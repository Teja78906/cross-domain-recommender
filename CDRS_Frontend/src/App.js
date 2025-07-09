import React, { useState } from "react";
import Main from "./Components/Main";
import Music from "./Components/Music";
import "./Components/style.css"
function App() {
  const [isCardClicked, setIsCardClicked] = useState(false);
  const [booktitle,setbktitle]=useState("");
  document.body.style.backgroundColor=isCardClicked?'rgb(62, 58, 55)':'rgb(117,81,57)';
  return (
    <>
     { !isCardClicked ?
      (<Main setIsCardClicked={setIsCardClicked} setbktitle={setbktitle}/>):(<Music item={booktitle}/>)}
    </>
  );
}

export default App;
