import { useState, useEffect } from "react";

import { getTest } from './functions/test';


function App (){
    const [data, setData] = useState("Hello World");

  useEffect(() => {
    getTest()
      .then(res => {
        setData(res.message);
      })
      .catch(err => console.log(err));
  }, []);

    return (
        <>
        <h1>{data}</h1>
        </>
    );
}

export default App;