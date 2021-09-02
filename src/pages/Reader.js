import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import CustomReader from '../components/CustomReader';
import IntellexReader from '../components/IntellexReader';

function Reader() {
  const [slug, setSlug] = useState("");
  let params = useParams();
  

  
  useEffect(()=>{
    setSlug(params.itemid)
  })

  return (
    <div  className="bg-white dark:bg-gray-700">
      {/* <CustomReader params={params.itemid}/> */}
      <IntellexReader params={params.itemid}/>
    </div>
  );
}

export default Reader;
