import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import ViewBooks from "./components/reader";

function Reader() {
  const [slug, setSlug] = useState("");
  // const [totalPageCount, setTotalPageCount] = useState(0);
  let params = useParams();
  

  
  useEffect(()=>{
    // console.log(totalPage, 'total page')
    setSlug(params.itemid)
    // setTotalPageCount(totalPage)
    // console.log(props.pageCount)
  })

  return (
    <div className="App">
      <ViewBooks params={slug}/>
    </div>
  );
}

export default Reader;
