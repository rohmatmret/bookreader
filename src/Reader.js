import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

import ViewBooks from "./components/reader";
function Reader() {
  const [slug, setSlug] = useState("");
  let params = useParams();

  useEffect(()=>{
    setSlug(params.itemid)
    console.log(params, 'params')
  })
  return (
    <div className="App">
      <ViewBooks params={slug}/>
    </div>
  );
}

export default Reader;
