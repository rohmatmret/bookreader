import React from "react";
import { useParams } from "react-router-dom";
import IntellexReader from '../components/IntellexReader';

const Reader = () => {
  let params = useParams();

  return (
    <div  className="bg-white dark:bg-gray-700">
      <IntellexReader params={params.itemid}/>
    </div>
  );
}

export default Reader;
